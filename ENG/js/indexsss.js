/* eslint-env browser */

window.addEventListener( "pageshow", function ( event )
{
    
    var historyTraversal = event.persisted || 
                             ( typeof window.performance != "undefined" && 
                                  window.performance.navigation.type === 2 );
      if ( historyTraversal ) 
      {
        window.location.reload();
      }
});

let sC_NoColor = 'repeating-linear-gradient(45deg, rgba(168, 168, 168, 0.2), rgba(168, 168, 168, 0.2) 10px, rgba(124, 124, 124, 0.2) 10px, rgba(124, 124, 124, 0.2) 20px)';

let siteEn = true;
let mobileVersion = false;
let isCookieActive = 1;

let colorPicking = -1;  //Global ID of colorBox picking
let hueColorPicking = -1;  //Global ID hue picking

let stopX = 0;
let stopY = 0;

let picker = document.getElementsByClassName('picker')[0];
let huePicker = document.getElementsByClassName('huePicker')[0];

let colorBox = document.getElementsByClassName('colorBox')[0];
let colorHue = document.getElementsByClassName('colorHue')[0];
let colorBox_color = document.getElementsByClassName('colorBox_color')[0];

let pickerWidthHalf = 0;
let huePickerWidthHalf = 0;

let boxTop = 0;
let boxBottom = 0;
let boxLeft = 0;
let boxRight = 0;
let hueTop = 0;
let hueBottom = 0;

if(picker != undefined)
{
    pickerWidthHalf = picker.offsetWidth/2;
    huePickerWidthHalf = huePicker.offsetWidth/2; 
    
    boxTop = 0 - pickerWidthHalf;
    boxBottom = boxTop + colorBox.offsetHeight;
    boxLeft = 0 - pickerWidthHalf;
    boxRight = colorBox.offsetWidth - pickerWidthHalf;

    hueTop = 0  - huePickerWidthHalf;
    hueBottom = hueTop + colorHue.offsetHeight;
}

let allLock = 
    [
        document.getElementsByClassName('lock_left_up-0')[0],
        document.getElementsByClassName('lock_left_down-1')[0],
        document.getElementsByClassName('lock_main-2')[0],
        document.getElementsByClassName('lock_right_up-3')[0],
        document.getElementsByClassName('lock_right_down-4')[0]
    ];
let isLocked = [false,false,false,false,false];

let curOffset = 0;
let curOffsetMenu = 0;
let colorBoxHueOffset = 0;
let offsetLeftTemp = 0;
let colorHueOffset = 0;

let newColor = document.getElementsByClassName('newColor')[0];
let oldColor = document.getElementsByClassName('oldColor')[0];

let oldColorPosX = 0;
let oldColorPoxY = 0;
let oldColorHex = '';

let colorChangeMenu = document.getElementsByClassName('colorChangeMenu')[0];
let allCloseBtn = document.getElementsByClassName('close_btn');
let allCloseBtnIcons = document.getElementsByClassName('close_btn_icon');
let colorChangeMenuExit = document.getElementsByClassName("colorChangeMenuExit")[0]

let picker_color = document.getElementsByClassName('picker_color')[0];
let huePicker_color = document.getElementsByClassName('huePicker_color')[0];

let rgbValueRegex = /[^0-9]+/;
let hexValidationRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

let saveColorBtn = document.getElementsByClassName('saveColorBtn')[0];
let saveColors = document.getElementsByClassName('sC');
let scCloseAll = document.getElementsByClassName('scClose');
let scCopyAll = document.getElementsByClassName('scCopy');

let moreSavedColors = document.getElementsByClassName('moreSavedColors')[0];
let more = document.getElementsByClassName('more')[0];
let svgMoreArrowDown = document.getElementsByClassName('svgMoreArrowDown')[0];

let savedColorsPos = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
let savedColorsRGB = ['0','0','0','0','0','0','0','0','0','0'];

let selectedSlot = 0;

let menuRGBInfo = 
    [
        document.getElementsByClassName('R')[0],
        document.getElementsByClassName('G')[0],
        document.getElementsByClassName('B')[0]
    ];

let hex = document.getElementsByClassName('hex')[0];

let bodyEl = document.getElementsByClassName('ocm')[0];


let colorHexMain = 
    [
        document.querySelector(".colorResult_main .colorHex_ad"),
        document.querySelector(".colorResult_main .colorHex_result") 
    ]
let activeColorBtns = 1;
let btnBaseName = "color_btn_";
let parameterName = "";
let allColors = [];
let btnColorChangeActive = "";

let allColorsHex = document.getElementsByClassName("colorHex");
let allColorsHexResults = document.getElementsByClassName("colorHex_result");

let resLeftArrow = document.getElementsByClassName("option_HideLeftResult")[0];
let resRightArrow = document.getElementsByClassName("option_HideRightResult")[0];

let optionArrows = 
    [
        document.getElementsByClassName("HideLeftResult_arrow")[0],
        document.getElementsByClassName("HideRightResult_arrow")[0], 
    ];

let themeSwitcher = document.getElementsByClassName("themeSwitcher");
let themeSwitcherSun = document.getElementsByClassName("themeSwitcherSun")[1];
let themeSwitcherMoon = document.getElementsByClassName("themeSwitcherMoon")[1];

let helpButton = document.getElementsByClassName("helpButton")[0];

let logos = document.getElementsByClassName("logo");

let aboutSite = document.getElementsByClassName("aboutSite")[0];
let aboutSiteMinimize = document.getElementsByClassName("aboutSite_minimize")[0];

let color_btn_add = document.getElementsByClassName("color_btn_add")[0];

let language = document.getElementsByClassName('language');

let allLanguagesMobile = 
    [
        document.getElementsByClassName("header_language")[0],
        document.getElementsByClassName("language_choose_container")[0]
    ];
let allLanguagesPC = 
    [
        document.getElementsByClassName("header_language")[1],
        document.getElementsByClassName("language_choose_container")[1]
    ];
let languageRU = 
    [
        document.getElementsByClassName("option_text_text_ru")[0],
        document.getElementsByClassName("option_save_text_ru")[0],
        document.getElementsByClassName("option_behance_text_ru")[0],
        document.getElementsByClassName("themeSwitcher_text_ru")[0],
        document.getElementsByClassName("result_text_ru")[0],
        document.getElementsByClassName("ColorBtns_text_ru")[0],
        document.getElementsByClassName("ralInfoText_1_ru")[0],
        document.getElementsByClassName("ralInfoText_2_ru")[0],
        document.getElementsByClassName("aboutSite_ru")[0]
    ];

let languageEN = 
    [
        document.getElementsByClassName("option_text_text_en")[0],
        document.getElementsByClassName("option_save_text_en")[0],
        document.getElementsByClassName("option_behance_text_en")[0],
        document.getElementsByClassName("themeSwitcher_text_en")[0],
        document.getElementsByClassName("result_text_en")[0],
        document.getElementsByClassName("ColorBtns_text_en")[0],
        document.getElementsByClassName("ralInfoText_1_en")[0],
        document.getElementsByClassName("ralInfoText_2_en")[0],
        document.getElementsByClassName("aboutSite_en")[0]
    ];

let mousePos;
let colorBoxVar = "";

let bgDark = "rgb(53, 54, 58)";
let bgBright = "rgb(209, 209, 209)";

let mainDark = "rgb(74, 74, 77)";
let mainBright = "rgb(248, 248, 248)";

let headerMenuDark = "rgb(74, 74, 77)";
let headerMenuBright = "rgb(238, 238, 238)";

let textDark = "rgb(175, 175, 175)";
let textBright = "rgb(105, 105, 105)";

let menuHoverEffectDark = "#252525";
let menuHoverEffectBright = "#E7E7E7";

let headerMenuBorderDark = "#58585c";

let ColorMenuBGDark = "rgba(35,35,35,0.8)";
let ColorMenuBGBright = "rgba(221, 221, 221, 0.65)";

let ColorMenuTextDark = "rgba(255, 255, 255, 0.45)";
let ColorMenuTextBright = "rgba(0, 0, 0, 0.65)";

let rgbHelperRegex = /(_[a-zA-Z]*){1,3}/;

let cookieWindow = document.getElementsByClassName('cookieWindow')[0];

let startingColors = 
    [
        "#12B3EA",
        "#626FEC",
        "#DF66EC",
    ];

let startingColorPickerPos = 
    [
        ['92.3077%', '8.24%'],
        ['58.4746%', '7.45%'],
        ['56.7797%', '7.45%']
    ];

let colorBtnsContainer = document.getElementsByClassName('colorBtns')[0];

let allColorBtns = 
    [
        document.getElementsByClassName("color_btn_1")[0],
        document.getElementsByClassName("color_btn_2")[0],
        document.getElementsByClassName("color_btn_3")[0],
        document.getElementsByClassName("color_btn_4")[0],
        document.getElementsByClassName("color_btn_5")[0]
    ];        

let allColorResult = 
    [
        document.getElementsByClassName("colorResult_left_up")[0],
        document.getElementsByClassName("colorResult_left_down")[0],
        document.getElementsByClassName("colorResult_main")[0],
        document.getElementsByClassName("colorResult_right_up")[0],
        document.getElementsByClassName("colorResult_right_down")[0]
    ];

let allRgbContainers = 
    [
        document.querySelector(".colorResult_left_up .rgbContainer"),
        document.querySelector(".colorResult_left_down .rgbContainer"),
        document.querySelector(".colorResult_main .rgbContainer"),
        document.querySelector(".colorResult_right_up .rgbContainer"),
        document.querySelector(".colorResult_right_down .rgbContainer"),
    ];

let allOptions = 
    [
        document.getElementsByClassName("option_text")[0],
        document.getElementsByClassName("option_save")[0],
        document.getElementsByClassName("option_behance")[0],
        document.getElementsByClassName("option_info")[0] 
    ];

let allCopyColorBtns =
    [
        document.getElementsByClassName("copyColor_left_up")[0],
        document.getElementsByClassName("copyColor_left_down")[0],
        document.getElementsByClassName("copyColor_main")[0],
        document.getElementsByClassName("copyColor_right_up")[0],
        document.getElementsByClassName("copyColor_right_down")[0],
    ];

let allColorsColors = document.getElementsByClassName("color_btn_color");

let optionText = 
    [
        document.getElementsByClassName("optionText_left_up")[0],
        document.getElementsByClassName("optionText_left_down")[0],
        document.getElementsByClassName("optionText_main")[0],
        document.getElementsByClassName("optionText_right_up")[0],
        document.getElementsByClassName("optionText_right_down")[0],
    ];

let colorHexUnselectable = document.getElementsByClassName("colorHex_ad");

let screen1149orLess = false;
let screen1000orLess = false;
let screen600orLess = false;
let screen550orLess = false;
let screen450orLess = false;

let scrollPosForMobile = 0;

let header_menu_mobile_content = document.getElementsByClassName('header_menu_mobile_content')[0];

document.addEventListener("DOMContentLoaded",Preparation());

if(allColorBtns[0] != null)
{
    ColorResultSet(ColorCheck());
}

/*window.addEventListener("load",() => {

    const colorItems = document.getElementsByClassName('changeBgBtn');
    Array.prototype.forEach.call(colorItems, function(item) 
    {
         item.addEventListener('click', function ()
        {
            const idSelected = this.id;
            document.documentElement.className = idSelected;
            //document.body.className = idSelected;
        })
    })

})*/
function Preparation()
{       
    if(document.getElementsByClassName('cookieBtnNO')[0].innerHTML == 'Decline')
    {
        siteEn = true;
    }
    else 
    {
        siteEn = false;
    }
    //console.log(sitelang);
    language[0].addEventListener('click',function()
    {
        siteEn = true;
        
    });
    language[1].addEventListener('click',function()
    {
        siteEn = false;
        
    });
    
    if(isCookieActive == 1)
    {
        if(CheckCookie('clrmashFT') == '0')
        {
            cookieWindow.style.display = 'block';
        }
    }
    //console.log(siteEn);
    
    document.getElementsByClassName('cookieBtnNO')[0].addEventListener('click',CookieDisagree);
    document.getElementsByClassName('cookieBtnYES')[0].addEventListener('click',CookieAgree);
    
    logos[Math.floor((Math.random() * 2))].style.display = "block";
        
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))//(window.mobileCheck)
    {
        mobileVersion = true;
        
        themeSwitcher[1].addEventListener('touchstart',ThemeSwitch);
        
        allLanguagesPC[0].addEventListener('touchstart', ShowLanguageListTouch);
        
        if(screen.width <= 450)
        {
            themeSwitcher[0].addEventListener('touchstart',ThemeSwitch);
            themeSwitcher[1].removeEventListener('touchstart',ThemeSwitch);
            themeSwitcherSun = document.getElementsByClassName("themeSwitcherSun")[0];
            themeSwitcherMoon = document.getElementsByClassName("themeSwitcherMoon")[0];
            
            allLanguagesMobile[0].addEventListener('touchstart', LanguageListSwitch);
            allLanguagesPC[0].removeEventListener('touchstart', ShowLanguageListTouch);
            
            screen450orLess = true;
            screen550orLess = true;
            screen600orLess = true;
            screen1000orLess = true;
            screen1149orLess = true;
        }
        else if(screen.width <= 549)
        {
            screen550orLess = true;
            screen600orLess = true;
            screen1000orLess = true;
            screen1149orLess = true;
        }
        else if(screen.width <= 600)
        {    
            screen600orLess = true;
            screen1000orLess = true;
            screen1149orLess = true;
        }
        else if(screen.width <= 1000)
        {
            screen1000orLess = true;
            screen1149orLess = true;
        }
        else if(screen.width <= 1149)
        {
            screen1149orLess = true;
        }

        header_menu_mobile_content.parentElement.addEventListener('touchstart', MobileMenuToggle);
    }
    
    if(allColorBtns[0] != null)
    {
        if (mobileVersion)//(window.mobileCheck)
        {             
            if(screen600orLess)
            {
                temp = document.getElementsByClassName('colorResult_container')[0].offsetTop;
                                
                colorChangeMenu.style.top = temp + document.getElementsByClassName('header_container')[0].offsetHeight + allColorResult[2].offsetHeight + document.getElementsByClassName('main_container')[0].style.marginTop.substr(0,3) * 18 +  'px';                
                
                tempPosScrollMobile = document.getElementsByClassName('container')[0].offsetTop + temp;
                
                scrollPosForMobile = tempPosScrollMobile;
                
                colorChangeMenu.style.height = screen.availHeight -document.getElementsByClassName('colorResult_container')[0].offsetHeight; + 'px';
            }
            
           /* colorChangeMenu.addEventListener('touchstart', function()
            {
                document.body.parentElement.style.overflowY = 'hidden';
            });
             */
            OptionInfo();
            
            allOptions[0].addEventListener('touchend', OptionText, true);
            allOptions[1].addEventListener('touchend', ColorSave);
            allOptions[2].addEventListener('touchend', ColorBehance);
            allOptions[3].addEventListener('touchend', OptionInfo);
            
            resLeftArrow.addEventListener('touchend', HideLeftAdditionalResult);
            resRightArrow.addEventListener('touchend', HideRightAdditionalResult);
        
            color_btn_add.addEventListener('touchstart', ColorBtnFunction, true);
            
            colorBox.addEventListener('touchstart',PickingMouseDown);
            colorHue.addEventListener('touchstart',HuePickingMouseDown);
            document.addEventListener('touchend',PickingMouseUp);
        
            for(var i = 0; i <= allColorBtns.length - 1; i++)
            {
                allColorBtns[i].addEventListener('mouseenter', ColorBtnOnHover, true);
                allColorsHex[i].addEventListener('change', HexColorChange, true);
                allCopyColorBtns[i].addEventListener('touchend', CopyResultColor);
                allLock[i].addEventListener('touchend',LockColor);
            }
            for(let i = 0; i <= saveColors.length - 1; i++)
            {
                saveColors[i].style.background = sC_NoColor;
                saveColors[i].style.backgroundColor = 'transparent';
                saveColors[i].addEventListener('touchend',SelectSlotSaveColor);
                scCloseAll[i].addEventListener('touchend',RemoveSavedColor);
                scCopyAll[i].addEventListener('touchend',CopySavedColor);
            }
            
            moreSavedColors.addEventListener('touchend', ShowMoreSavedColors);
            
            oldColor.addEventListener('touchend', CopyOldColor);
        }
        else
        {
            allOptions[0].addEventListener('click', OptionText, true);
            allOptions[1].addEventListener('click', ColorSave);
            allOptions[2].addEventListener('click', ColorBehance);
            allOptions[3].addEventListener('click', OptionInfo);
            
            resLeftArrow.addEventListener('click', HideLeftAdditionalResult);
            resRightArrow.addEventListener('click', HideRightAdditionalResult);
            
            color_btn_add.addEventListener('click', ColorBtnFunction, true);
            
            colorBox.addEventListener('mousedown',PickingMouseDown);
            colorHue.addEventListener('mousedown',HuePickingMouseDown);
            document.addEventListener('mouseup',PickingMouseUp);
            
            for(var i = 0; i <= allColorBtns.length - 1; i++)
            {
                allColorBtns[i].addEventListener('mouseenter', ColorBtnOnHover, true);
                allColorsHex[i].addEventListener('change', HexColorChange, true);
                allCopyColorBtns[i].addEventListener('click', CopyResultColor);
                allLock[i].addEventListener('click',LockColor);
            }
            for(let i = 0; i <= saveColors.length - 1; i++)
            {
                saveColors[i].style.background = sC_NoColor;
                saveColors[i].style.backgroundColor = 'transparent';
                saveColors[i].addEventListener('click',SelectSlotSaveColor);
                scCloseAll[i].addEventListener('click',RemoveSavedColor);
                scCopyAll[i].addEventListener('click',CopySavedColor);
            }
            
            moreSavedColors.addEventListener('click', ShowMoreSavedColors);
            
            oldColor.addEventListener('click', CopyOldColor);
            
            themeSwitcher[1].addEventListener('click',ThemeSwitch);
            
            allLanguagesPC[0].addEventListener('mouseenter', ShowLanguageList);
            allLanguagesPC[0].addEventListener('mouseleave', CloseLanguageList);
        }
        
        allColorsColors[0].addEventListener('click', ColorChangeFunction, true);
        
        CheckFrstCloseBtn();
        
        allColorBtns[0].children[0].children[0].addEventListener('click', CloseBtnFunction, true); 
        
        allColorBtns[0].children[0].style.backgroundColor = ColorChangeSystem(3); //First Color
        allColorBtns[0].children[0].style.display = "block";

        helpButton.addEventListener('mouseup', HelpButtonFunction, true);
        
        for(let i = 0; i <= colorHexUnselectable.length - 1; i++)
        {
            colorHexUnselectable[i].addEventListener("mousedown", function(event){event.preventDefault()});
        }
        
        //if ('ontouchstart' in document.documentElement && 'ontouchmove')
        //{
           // console.log('touch is supported');
        //}
        
        saveColorBtn.addEventListener('click',SaveColorFunction);
        
        for(let i = 0; i <= menuRGBInfo.length - 1; i++)
        {
            menuRGBInfo[i].addEventListener('change', RGBChanged);
        }

        hex.addEventListener('input', HEXChanged);
        
        if(isCookieActive == 1)
        {
            CheckSavedColorsCookie();
        }
        
        aboutSiteMinimize.addEventListener("mouseup",AboutSiteClose);
    }

    if(isCookieActive == 1)
    {
        CheckThemeCookie();
    }
    
}
window.mobileCheck = function() {
  let check = false;
  function Al(a)
   {
      if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
          check = true;
  }(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function HelpButtonFunction()
{
    if(!siteEn)
    {
        if(languageRU[0].style.visibility == 'visible')
        { 
            for(let i = 0; i <= 5; i++)
            {
                languageRU[i].style.visibility = 'hidden'; 
            }     
        }
        else
        { 
            for(let i = 0; i <= 5; i++)
            {
                languageRU[i].style.visibility = 'visible';  
            }
        } 
    }
    else
    {
        if(languageEN[0].style.visibility == 'visible')
        { 
            for(let i = 0; i <= 5; i++)
            {
                languageEN[i].style.visibility = 'hidden';
            }     
        }
        else
        { 
            for(let i = 0; i <= 5; i++)
            {
                languageEN[i].style.visibility = 'visible'; 
            }
        } 
    }
}
function HideLeftAdditionalResult()
{
    if(allColorResult[0].getBoundingClientRect().width != 0)
    {
        allColorResult[0].classList.add('ah');
        allColorResult[0].style.animationName = "option_adColors_fadeAway";
        allColorResult[1].style.animationName = "option_adColors_fadeAway";
        
        resLeftArrow.children[0].style.transform = "scale(-1,1) translateY(-50%)";
        if(screen1149orLess)
        {
            resLeftArrow.style.animationName = "mResArrowLeftMove";
            
            if(screen450orLess)
            {
                allCopyColorBtns[2].style.top = '0.1em';
                allRgbContainers[2].style.top = '0.1em'; 
                
                colorHexMain[0].style.top = '1.6em';
                colorHexMain[1].style.top = '1.6em';   
            }
            else
            {
                allCopyColorBtns[2].style.top = '0.5em';
                allRgbContainers[2].style.top = '0.5em';  

                colorHexMain[0].style.top = '1.9em';
                colorHexMain[1].style.top = '1.9em';   
            }
        }
        else
        {
            resLeftArrow.style.animationName = "resArrowLeftMove";
            
            allRgbContainers[2].style.left = '0.5em';  

            colorHexMain[0].style.right = '48.9em';
            colorHexMain[1].style.right = '48.9em';
        }
    }
    else
    {
        allColorResult[0].classList.remove('ah');
        allColorResult[0].style.animationName = "option_adColors_fadeIn";
        allColorResult[1].style.animationName = "option_adColors_fadeIn";
        
        resLeftArrow.children[0].style.transform = 'scale(1,1) translateY(-50%)';

        if(screen1149orLess)
        {
            resLeftArrow.style.animationName = "mResArrowLeftMoveReverse";
            
            allCopyColorBtns[2].style.top = '5.5em';
            allRgbContainers[2].style.top = '5.2em';
            
            if(screen450orLess)
            {                
                colorHexMain[0].style.top = '7.8em';
                colorHexMain[1].style.top = '7.8em';
            }
            else
            {
                colorHexMain[0].style.top = '6.6em';
                colorHexMain[1].style.top = '6.6em';  
            }
        }
        else
        { 
            resLeftArrow.style.animationName = "resArrowLeftMoveReverse";
            
            allRgbContainers[2].style.left = '12.8em';

            colorHexMain[0].style.right = '35.1em';
            colorHexMain[1].style.right = '35.1em';
        }
    }
    
    if(optionText[2].style.display == 'flex')
        OptionTextUpdate();
}
function HideRightAdditionalResult()
{
    if(allColorResult[3].getBoundingClientRect().width != 0)
    {
        allColorResult[4].classList.add('ah');
        allColorResult[3].style.animationName = "option_adColors_fadeAway";
        allColorResult[4].style.animationName = "option_adColors_fadeAway";
        
        resRightArrow.style.right = "0%";
        resRightArrow.children[0].style.transform = "scale(1,1) translateY(-50%)";
        
        if(screen1149orLess)
        {
            resRightArrow.style.animationName = "mResArrowRightMove";
        }
        else
        {
            resRightArrow.style.animationName = "resArrowRightMove";
            allCopyColorBtns[2].style.right = '0.5em';
        }
    }
    else
    {
        allColorResult[4].classList.remove('ah');
        allColorResult[3].style.animationName = "option_adColors_fadeIn";
        allColorResult[4].style.animationName = "option_adColors_fadeIn";
        
        resRightArrow.style.right = "25%";
        resRightArrow.children[0].style.transform = "scale(-1,1) translateY(-50%)";
        
        if(screen1149orLess)
        {
            resRightArrow.style.animationName = "mResArrowRightMoveReverse";
        }
        else
        {
            resRightArrow.style.animationName = "resArrowRightMoveReverse";
            allCopyColorBtns[2].style.right = '12.5em';
        }
    }
    
    if(optionText[2].style.display == 'flex')
        OptionTextUpdate();
}
function CopyColorBtnDisplayChange()
{
    if(allCopyColorBtns[0].style.display == 'none' || window.getComputedStyle(allCopyColorBtns[0], null).display == 'none')
    {
        for(let i = 0; i <= allCopyColorBtns.length - 1; i++)
        {
            allCopyColorBtns[i].style.display = 'block';
        }
    }
    else
    {
        for(let i = 0; i <= allCopyColorBtns.length - 1; i++)
        {
            allCopyColorBtns[i].style.display = 'none';
        }
    }
    
    //console.log("LOL: " + allCopyColorBtns[0].style.display);
}
function CopyResultColor()
{    
    CopyColor(this.parentElement);
}
/*function LanguageCookie(el)
{
    if(CheckCookie('lang') == "RUS")
    {
        for(let i = 0; i <= languageRU.length - 1; i++)
        {
            if(languageEN[i] != null && languageRU[i] != null)
            {
                languageEN[i].style.display = 'none';
                languageRU[i].style.display = 'block';
            }
        }
        
        document.getElementsByClassName("problemEmail_ru")[0].style.display = 'inline';
        
        if(document.getElementsByClassName("aboutSite")[0] != null)
        document.getElementsByClassName("aboutSite")[0].style.height = '365px';
    }
    else
    {
        for(let i = 0; i <= languageRU.length - 1; i++)
        {
            if(languageEN[i] != null && languageRU[i] != null)
            {
                languageRU[i].style.display = 'none';
                languageEN[i].style.display = 'block';
            }
        }
        
        document.getElementsByClassName("problemEmail_ru")[0].style.display = 'none';
        
        if(document.getElementsByClassName("aboutSite")[0] != null)
        document.getElementsByClassName("aboutSite")[0].style.height = '325px';
    }

}*/

/*function CheckLanguageCookie()
{
    if(CheckCookie('lang') != "0")
    {
        SetCookie('lang',CheckCookie('lang'),3);
    }
    else
    {   
        SetCookie('lang','ENG',3);
    }
    
    LanguageCookie();
}*/

function CheckThemeCookie()
{
    if(CheckCookie('clrmashTh') != "0")
    {
        if(CheckCookie('clrmashTh') == '1')
        { 
            SetCookie('clrmashTh','1',3);
            ThemeSet(bgDark,mainDark,bgDark,headerMenuBorderDark,textDark,menuHoverEffectDark,ColorMenuBGDark,ColorMenuTextDark,themeSwitcherSun,themeSwitcherMoon); 
        }
        else
        {
            SetCookie('clrmashTh','2',3);
            ThemeSet(bgBright,mainBright,headerMenuBright,bgBright,textBright,menuHoverEffectBright,ColorMenuBGBright,ColorMenuTextBright,themeSwitcherMoon,themeSwitcherSun);
        }
    }
    else
    {
        SetCookie('clrmashTh','1',3);
        ThemeSet(bgDark,mainDark,bgDark,headerMenuBorderDark,textDark,menuHoverEffectDark,ColorMenuBGDark,ColorMenuTextDark,themeSwitcherSun,themeSwitcherMoon);
        
    }
}
function ThemeSwitch()
{    
    //console.log(CheckCookie('theme') + " before");
    if(document.documentElement.style.getPropertyValue('--bgColor') == bgDark)
    {            
        if(isCookieActive == 1)
        {
            SetCookie('clrmashTh','2',3);
        }
        ThemeSet(bgBright,mainBright,headerMenuBright,bgBright,textBright,menuHoverEffectBright,ColorMenuBGBright,ColorMenuTextBright,themeSwitcherMoon,themeSwitcherSun);
    }
    else
    {
        if(isCookieActive == 1)
        {
            SetCookie('clrmashTh','1',3);
        }
        ThemeSet(bgDark,mainDark,bgDark,headerMenuBorderDark,textDark,menuHoverEffectDark,ColorMenuBGDark,ColorMenuTextDark,themeSwitcherSun,themeSwitcherMoon);
    }
    
    //console.log(CheckCookie('theme') + " after");
}

function ThemeSet(bgColor,mainColor,headerMenuColor,headerMenuBorder,textColor,hoverEffectColor,ColorMenuBG,ColorMenuText,iconName,iconNameOff)
{
    if(iconNameOff != null)
    {
        iconNameOff.style.display = "none";
    }
    iconName.style.display = "block";

    document.documentElement.style.setProperty('--bgColor', bgColor);
    document.documentElement.style.setProperty('--mainColor', mainColor);
    document.documentElement.style.setProperty('--headerMenu', headerMenuColor);
    document.documentElement.style.setProperty('--headerMenuBorder', headerMenuBorder);
    document.documentElement.style.setProperty('--textColor', textColor);
    document.documentElement.style.setProperty('--menuHoverEffect', hoverEffectColor);
    document.documentElement.style.setProperty('--ColorMenuBG', ColorMenuBG);
    document.documentElement.style.setProperty('--ColorMenuText', ColorMenuText);
    
    if(moreSavedColors != undefined)
    {
        if(CheckCookie('clrmashTh') == '1')
        {
            moreSavedColors.classList.remove('menuBright');
            colorChangeMenuExit.classList.remove('menuBright');
            saveColorBtn.classList.remove('btnMenuBright');
        }
        else
        {   
            moreSavedColors.classList.add('menuBright');
            colorChangeMenuExit.classList.add('menuBright');
            saveColorBtn.classList.add('btnMenuBright');
        }
    }
}

function CheckCookie(cookieName)
{
    var match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) 
    {
        return match[2];
    }
    else
    {
        return "0";
    } 
}

function ColorBtnOnHover()
{
    if(colorChangeMenu.style.display == "inline-block")
    {
        this.style.cursor = "default";
    }
}

function CloseChangeMenu_exitBtn(e)
{
    //console.log('mouseUp: ' + e.target.getAttribute('class'));
    
    if(colorChangeMenuExit === e.target)
    {
        if(mobileVersion)
        {
            document.removeEventListener('touchstart', CloseChangeMenu);
            
            resLeftArrow.style.display = 'block';
            resRightArrow.style.display = 'block';
        }
        else
        {
            document.removeEventListener('mousedown', CloseChangeMenu);
        }

        colorBtnsContainer.style.pointerEvents = 'auto';

        colorChangeMenu.style.display = "none";

        if(screen600orLess)
        {
            document.body.parentElement.style.overflowY = 'visible';
            
            document.body.style.position = 'absolute';
            document.body.style.top = '0px';
        }
        else if(screen1149orLess)
        {        
            allRgbContainers[4].classList.remove('RGBmenuOpen');
            allColorResult[4].children[0].classList.remove('HEXmenuOpen');
            allColorResult[4].children[1].classList.remove('HEXmenuOpen');
            allLock[4].classList.remove('LOCKmenuOpen');
            allLock[3].classList.remove('LOCKLEFTmenuOpen');
        }

        ColorBtnsFlexGrowUpdate();

        CopyColorBtnDisplayChange();

        ColorResultSet(ColorCheck());
    }
}
function CloseChangeMenu_document(e)
{
    //console.log('mouseUp: ' + e.target.getAttribute('class'));
    
    if(!colorChangeMenu.contains(e.target))
    {
        //todo
                
        if(allCopyColorBtns.some(x => x.contains(e.target)) || allLock.some(x => x.contains(e.target)))
        {
            return 0;
        }
        
        if(mobileVersion)
        {
            document.removeEventListener('touchstart', CloseChangeMenu);
            
            resLeftArrow.style.display = 'block';
            resRightArrow.style.display = 'block';
        }
        else
        {
            document.removeEventListener('mousedown', CloseChangeMenu);
        }

        colorBtnsContainer.style.pointerEvents = 'auto';

        colorChangeMenu.style.display = "none";

        if(screen600orLess)
        {
            document.body.parentElement.style.overflowY = 'visible';
            
            document.body.style.position = 'absolute';
            document.body.style.top = '0px';
        }
        else if(screen1149orLess)
        {        
            allRgbContainers[4].classList.remove('RGBmenuOpen');
            allColorResult[4].children[0].classList.remove('HEXmenuOpen');
            allColorResult[4].children[1].classList.remove('HEXmenuOpen');
            allLock[4].classList.remove('LOCKmenuOpen');
            allLock[3].classList.remove('LOCKLEFTmenuOpen');
        }

        ColorBtnsFlexGrowUpdate();

        CopyColorBtnDisplayChange();

        ColorResultSet(ColorCheck());
    }
}
function CloseChangeMenu(e)
{
    //console.log('mouseDown: ' + e.target.getAttribute('class'));
    //e.stopPropagation();
    if (colorChangeMenu.contains(e.target))
    {
        //Inside menu
        if(e.target == colorChangeMenuExit)
        {    
            if(mobileVersion)
            {
                document.addEventListener('touchend', CloseChangeMenu_exitBtn, {once: true, capture: true});
            }
            else
            {  
                document.addEventListener('mouseup', CloseChangeMenu_exitBtn, {once: true});
            }
        }
    } 
    else
    {
        //Outside menu
        if(mobileVersion)
        {
            document.addEventListener('touchend', CloseChangeMenu_document, {once: true});
        }
        else
        {
            document.addEventListener('mouseup', CloseChangeMenu_document, {once: true});
        }
    }
}

function SetCookie(cname, cvalue, exdays) 
{
  const d = new Date();
    
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
    
  let expires = "expires="+ d.toUTCString();
    
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

function ValidHex(hex)
{
    if(hex.match(hexValidationRegex))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ColorChangeSystem(max)
{
    return startingColors[Math.floor((Math.random() * max))];//random color from "startingColors"
}
function ColorChangeFunctionNonEvent(el,event)
{
    event.stopPropagation();
    
    if(btnColorChangeActive != el)
    {
        ColorBtnsFlexGrowUpdate();
        
        btnColorChangeActive = el;

        colorChangeMenu.style.display = "inline-block";
        colorChangeMenu.style.opacity = 1;
        
        if(screen600orLess)
        {
            curMenuOffset = window.pageYOffset;

           /* colorChangeMenuHeightTemp = screen.availHeight + curMenuOffset - colorChangeMenu.offsetTop;*/
            //console.log(screen.availHeight + '-' + curMenuOffset + '+' + colorChangeMenu.offsetTop);
            //colorChangeMenu.style.height = colorChangeMenuHeightTemp + 'px';

            //window.scrollTo(0,scrollPosForMobile);
            allColorResult[2].scrollIntoView();
            
            document.body.parentElement.style.overflowY = 'hidden';
            
            /*document.body.style.position = 'fixed';
            document.body.style.top = scrollPosForMobile * (-1) + 'px';*/
        }
        
        if(screen550orLess)
        {
            colorHueOffset = colorHue.parentElement.offsetTop;
            colorBoxHueOffset = colorHue.parentElement.offsetTop;
            offsetLeftTemp = colorBox.parentElement.offsetLeft;
            //console.log((1 -(screen.availWidth/550)) + 1)
        }
        else
        {
            colorHueOffset = colorHue.offsetTop;
            colorBoxHueOffset = colorHue.offsetTop;
            offsetLeftTemp = colorBox.offsetLeft;
        }
        //console.log("ColorBoxUpdate: " + this.style.backgroundColor);

        hex.value = RgbToHex(el.style.backgroundColor);
        
        CopyColorBtnDisplayChange();
        
        if(mobileVersion)
        {
            document.addEventListener('touchstart', CloseChangeMenu);
            
            resLeftArrow.style.display = 'none';
            resRightArrow.style.display = 'none';
        }
        else
        {
            document.addEventListener('mousedown', CloseChangeMenu);
        }
    }
}
function ColorChangeFunction(e)
{   
    if(e.target == this)
    {
        e.stopPropagation();
        //document.documentElement.style.scrollBehavior = "smooth";
        
        //window.scrollTo(0,scrollPosForMobile);
        colorBtnsContainer.style.pointerEvents = 'none';
        
        if(!screen600orLess && screen1149orLess)
        {
            if(optionText[2].style.display == 'flex')
            {
                OptionText();
            }

            allRgbContainers[4].classList.add('RGBmenuOpen');
            allColorResult[4].children[0].classList.add('HEXmenuOpen');
            allColorResult[4].children[1].classList.add('HEXmenuOpen');
            allLock[4].classList.add('LOCKmenuOpen');
            allLock[3].classList.add('LOCKLEFTmenuOpen');
        }
        if(screen1000orLess)
        {
            aboutSite.style.marginTop = 3.5 * activeColorBtns + 'em';
        }
        
        
        if(btnColorChangeActive != this)
        {
            tempColor = this.style.backgroundColor;
            
            ColorBtnsFlexGrowUpdate();
            CopyColorBtnDisplayChange();

            btnColorChangeActive = this;

            //console.log(btnColorChangeActive);
            
            colorChangeMenu.style.display = "inline-block";
            colorChangeMenu.style.opacity = 1;  
            
            if(screen600orLess)
            {
                curOffset = window.pageYOffset;
                
                /*colorChangeMenuHeightTemp = screen.availHeight + window.pageYOffset - colorChangeMenu.offsetTop;*/
                /*colorChangeMenu.style.height = colorChangeMenuHeightTemp + 'px';*/
                
                allColorResult[2].scrollIntoView({behavior: "smooth"});
                
                document.body.parentElement.style.overflowY = 'hidden';

                /*document.body.style.position = 'fixed';
                document.body.style.top = scrollPosForMobile * (-1) + 'px';*/
            }

            if(screen550orLess)
            {
                colorHueOffset = colorHue.parentElement.offsetTop;
                colorBoxHueOffset = colorHue.parentElement.offsetTop;
                offsetLeftTemp = colorBox.parentElement.offsetLeft;
                //console.log((1 -(screen.availWidth/550)) + 1)
            }
            else
            {
                colorHueOffset = colorHue.offsetTop;
                colorBoxHueOffset = colorHue.offsetTop;
                offsetLeftTemp = colorBox.offsetLeft;
            }
            
            //console.log("ColorBoxUpdate: " + this.style.backgroundColor);
            
            newColor.style.backgroundColor = tempColor;
            
            oldColor.style.backgroundColor = tempColor;
            
            ChangeColor(tempColor);
            
            oldColorPosX = picker.style.left;
            oldColorPosY = picker.style.top;
        }
        
        if(mobileVersion)
        {
            document.addEventListener('touchstart', CloseChangeMenu);
            
            resLeftArrow.style.display = 'none';
            resRightArrow.style.display = 'none';
        }
        else
        {
            document.addEventListener('mousedown', CloseChangeMenu);
        }
    }
}

function HexColorChange()
{
    //console.log(this.value.length);
    
    if(ValidHex('#' + this.value))
    {
        this.parentElement.style.backgroundColor = '#' + this.value;
    }
    
    ColorResultSet(ColorCheck());
}

function BorderRadiusUpdate()
{
    if(activeColorBtns > 1)
    {
        btnTempRound = document.getElementsByClassName(btnBaseName + activeColorBtns)[0];
        btnTempStraight = document.getElementsByClassName(btnBaseName + (activeColorBtns - 1))[0];
        
        if(!screen1000orLess)
        {
            btnTempRound.style.borderTopRightRadius = "0.7em";
            btnTempRound.style.borderBottomRightRadius = "0.7em";

            //console.log(btnTempRound);

            btnTempStraight.style.borderTopRightRadius = "0em";
            btnTempStraight.style.borderBottomRightRadius = "0em";
        }
    }
}
function ColorBtnFunction(e)
{   
    activeColorBtns++;

    colorBtnsContainer.style.pointerEvents = 'none';
    
    if(!screen600orLess && screen1149orLess)
    {
        if(optionText[2].style.display == 'flex')
        {
            OptionText();
        }
        
        allRgbContainers[4].classList.add('RGBmenuOpen');
        allColorResult[4].children[0].classList.add('HEXmenuOpen');
        allColorResult[4].children[1].classList.add('HEXmenuOpen');
        allLock[4].classList.add('LOCKmenuOpen');
        allLock[3].classList.add('LOCKLEFTmenuOpen');
    }
    if(screen1000orLess)
    {
        aboutSite.style.marginTop = 3.5 * activeColorBtns + 'em';
    }
    //console.log("activeColorBtns: "+ activeColorBtns);
    
    CheckFrstCloseBtn();

    allColorBtns[activeColorBtns - 1].children[0].children[0].addEventListener('click', CloseBtnFunction, true);
    allColorsColors[activeColorBtns - 1].addEventListener('click', ColorChangeFunction, true);
    
    
    if(activeColorBtns == 5)
    {
        color_btn_add.style.display = "none";
    }

    ColorBtnsFlexGrowUpdate();

    btn = document.getElementsByClassName(btnBaseName + activeColorBtns)[0];
    
    picker.style.left = '100%';
    picker.style.top = '0%';
    
    huePicker.style.top = '0%';
    
    oldColor.style.backgroundColor = 'rgb(255, 0, 0)';
    oldColorPosX = '100%';
    oldColorPosY = '0%';
    oldColorHex = '#FF0000';
    
    btn.style.flexGrow = 1;
    btn.children[0].style.display = 'block';
    
    BorderRadiusUpdate();
    
    if(this != allColorBtns[0])
    {
        btn.children[0].children[0].style.display = 'block';//x_icon
    }
    
    ColorChangeFunctionNonEvent(btn.children[0],e); 
    
    HueColorCalculation();
    
    ColorCalculation();
    
    ResultColorUpdate();
}

function CloseBtnFunction(e)
{  
    //console.log(activeColorBtns);
    if(e.target == this)
    {   
        if(mobileVersion)
        {
            allColorBtns[activeColorBtns - 1].children[0].children[0].removeEventListener('touchend', CloseBtnFunction, true);
            
            allColorsColors[activeColorBtns - 1].removeEventListener('touchend', ColorChangeFunction, true);
        }
        else
        {
            allColorBtns[activeColorBtns - 1].children[0].children[0].removeEventListener('click', CloseBtnFunction, true);

            allColorsColors[activeColorBtns - 1].removeEventListener('click', ColorChangeFunction, true);
        }
        
        color_btn_add.style.display = "block";
        
        ColorBtnsFlexGrowUpdate();

        thisClassName = this.parentElement.parentElement.getAttribute('class');
        //console.log(thisClassName);
        openBtn = btnBaseName.concat(thisClassName.charAt(thisClassName.length-1)*1 - 1);
        //console.log("openBtn; "+ openBtn);

        //console.log("closeBtn; "+ closeBtn);

        //console.log(thisClassName + " " + openBtn + " " + closeBtn);
        //console.log(activeColorBtns > thisClassName.charAt(thisClassName.length-1)*1)
        //console.log(activeColorBtns + " > " + thisClassName.charAt(thisClassName.length-1)*1)

        if(activeColorBtns > thisClassName.charAt(thisClassName.length-1)*1)
        {
            remainingBtns = activeColorBtns - thisClassName.charAt(thisClassName.length-1)*1;

            for(let i = 1; i <= remainingBtns; i++)
            {
                grabClrBtn = btnBaseName.concat(thisClassName.charAt(thisClassName.length-1)*1 + i);
                putToClrBtn = btnBaseName.concat(grabClrBtn.charAt(grabClrBtn.length-1)*1 - 1);

                //console.log('Grab from: ' + grabClrBtn);
                //console.log('Give to: ' + putToClrBtn);

                grabColor = document.getElementsByClassName(grabClrBtn)[0].children[0].style.backgroundColor;
                putColor = document.getElementsByClassName(putToClrBtn)[0].children[0].style.backgroundColor = grabColor;

                if(i == remainingBtns)
                {
                    colorGrabTemp = document.getElementsByClassName(grabClrBtn)[0];
                    
                    colorGrabTemp.children[0].style.backgroundColor = "";
                    colorGrabTemp.children[0].style.display = "none";

                    colorGrabTemp.style.flexGrow = 0;
                    
                    if(!screen1000orLess)
                    {
                        colorGrabTemp.style.borderBottomRightRadius = "0em";
                        colorGrabTemp.style.borderTopRightRadius = "0em";
                        
                        document.getElementsByClassName(putToClrBtn)[0].style.borderBottomRightRadius = "0.7em";
                        document.getElementsByClassName(putToClrBtn)[0].style.borderTopRightRadius = "0.7em";
                    }
                    
                    colorGrabTemp.children[0].children[0].style.display = "none";
                    

                    if(activeColorBtns == 3 || activeColorBtns == 4)
                    {
                        hideBtn = btnBaseName.concat(thisClassName.charAt(thisClassName.length-1)*1 + i + 1);

                        document.getElementsByClassName(hideBtn)[0].style.flexGrow = 0;
                    }
                }
            }
            
            ColorCheck();
        }
        else
        {
            btnCloseMostLeft = document.getElementsByClassName(thisClassName)[0];
            
            btnCloseMostLeft.style.flexGrow = 0;
            btnCloseMostLeft.children[0].style.display = "none";
            btnCloseMostLeft.children[0].style.backgroundColor = "";
            
            if(!screen1000orLess)
            {
                allColorBtns[parseInt(thisClassName.charAt(thisClassName.length - 1) - 2)].style.borderBottomRightRadius = "0.7em";
                allColorBtns[parseInt(thisClassName.charAt(thisClassName.length - 1) - 2)].style.borderTopRightRadius = "0.7em";
            }
        }
        
        //console.log("activeColorBtns: " + activeColorBtns);
        
        activeColorBtns--;
        
        if(screen1000orLess)
        {
            aboutSite.style.marginTop = 3.5 * activeColorBtns + 'em';
        }
        
        this.onload = ColorResultSet(ColorCheck());
        this.onload = CheckFrstCloseBtn();
    }
}

function CheckFrstCloseBtn()
{
    if(activeColorBtns > 1)
    {
        allColorBtns[0].children[0].children[0].style.display = "block";
        allColorBtns[0].children[0].children[1].style.display = "block";
    }
    else
    {
        allColorBtns[0].children[0].children[0].style.display = "none";
        allColorBtns[0].children[0].children[1].style.display = "none";
    }
}

function SetAdditionalColors(mainColorArray)
{
    tempColorRGBElements = [];
    
    for(let k = 0; k <= ((mainColorArray.length - 1) + mainColorArray.length * 3); k++)
    {   
        if(!isLocked[0] && k <= mainColorArray.length - 1)   //Left-Up
        {
             tempColorRGBElements[k] = (255 - mainColorArray[k])/4 + parseInt(mainColorArray[k]);
        }
        else if(!isLocked[1] && k <= mainColorArray.length - 1 + mainColorArray.length)    //Left-Down
        {
            tempColorRGBElements[k] = (255 - mainColorArray[k - (mainColorArray.length)])/2 + parseInt(mainColorArray[k - mainColorArray.length]);
        }
        else if(!isLocked[3] && k <= (mainColorArray.length - 1 + mainColorArray.length * 2))    //Right-Up
        {
            tempColorRGBElements[k] =  mainColorArray[k - (mainColorArray.length * 2)] * 0.75;
        }
        else if(!isLocked[4] && k <= mainColorArray.length - 1 + mainColorArray.length * 3)     //Right-Down
        {
            tempColorRGBElements[k] =  mainColorArray[k - (mainColorArray.length * 3)] * 0.5;
        }
    }
    
    k = 0;
    
    allColorResult[0].style.backgroundColor = "rgb(" + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ")";
    
    allColorResult[1].style.backgroundColor = "rgb(" + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ")";
    
    allColorResult[3].style.backgroundColor = "rgb(" + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ")";
    
    allColorResult[4].style.backgroundColor = "rgb(" + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ',' + tempColorRGBElements[k++] + ")";
    
    ResultColorToHex();
}

function ColorSimilar(colorElement)
{
    tempColor = RgbToHSL(colorElement.style.backgroundColor);
    
    if(tempColor[2] >= 50)
    {
        tempColor[2] = Math.round(tempColor[2]) - 35;

        if(tempColor[1] >= 80)
        {
            tempColor[1] = 50;
        }
    }
    else
    {
        tempColor[2] = Math.round(tempColor[2]) + 35;
    }
    
    theColor = "hsl("+tempColor[0]+','+tempColor[1]+'%,'+tempColor[2]+'%)';
    
    return theColor;
}

function BtnHexColor(btnColor, btnHex)
{    
    theColor = ColorSimilar(btnColor);
    
    btnHex.style.color = theColor;
    btnHex.previousElementSibling.style.color = theColor;
}

function ResultInfoColor()
{
    for(let i = 0; i <= allColorResult.length - 1; i++)
    {       
        if(!isLocked[i])
        {
            theColor = ColorSimilar(allColorResult[i]);

            allColorResult[i].children[1].style.color = theColor;
            allColorResult[i].children[0].style.color = theColor;

            allCopyColorBtns[i].style.fill = theColor;

            allRgbContainers[i].style.color = theColor;
            allRgbContainers[i].style.fill = theColor;
        }
        
        //console.log("AllColorResult_"+i+': lol ' + tempColor);
    }
    if(!isLocked[2])
    {  
        optionArrows[0].style.fill = ColorSimilar(allColorResult[2]);
        optionArrows[1].style.fill = optionArrows[0].style.fill;
    }
    
}
function BtnCloseColor(btn)
{
    tempColor = RgbToHSL(btn.style.backgroundColor);
    
    if(tempColor[2] <= 30 && btn.children[0].style.backgroundColor != "white")
    {
        btn.children[0].style.backgroundColor = "white";
        btn.children[1].style.fill = "white";
        //console.log(btn.children[0].style.backgroundColor );
    }
    else if(tempColor[2] >= 30 && btn.children[0].style.backgroundColor != "black")
    {
        btn.children[0].style.backgroundColor = "black";
        btn.children[1].style.fill = "black";
    }
}

function ColorResultSet(arrayColors)
{
    indvidualColorsRGB = [];
    finalColorRGBElements = [];
    indvidualColorsRGBCoeff = {};
    
    if(arrayColors.length > 1)
    {
        particularRGBElements = [];

        for(let i = 0; i <= arrayColors.length - 1; i++)
        {
            //console.log("arrayColors["+i+"] = " + arrayColors[i]);
            indvidualColorsRGB[i] = arrayColors[i].split(rgbValueRegex);
            indvidualColorsRGB[i].shift();
            indvidualColorsRGB[i].pop();
            //console.log("indvidualColorsRGB_color_" + i + ": " + indvidualColorsRGB[i]);

            if(indvidualColorsRGBCoeff.hasOwnProperty(indvidualColorsRGB[i]))
            {
                indvidualColorsRGBCoeff[indvidualColorsRGB[i]]++;
            }
            else
            {
                indvidualColorsRGBCoeff[indvidualColorsRGB[i]] = 1;
            }

            //console.log(indvidualColorsRGB[i] + " coef " + indvidualColorsRGBCoeff[indvidualColorsRGB[i]]); 
        }

        for(let i = 0; i <= indvidualColorsRGB.length - 1; i++)
        {
            for(let t = 0; t <= indvidualColorsRGB.length - 1; t++)
            {
                if
                (
                    i != t &&
                    indvidualColorsRGB[i][0] == indvidualColorsRGB[t][0] &&
                    indvidualColorsRGB[i][1] == indvidualColorsRGB[t][1] &&
                    indvidualColorsRGB[i][2] == indvidualColorsRGB[t][2]
                )
                {
                    indvidualColorsRGB.splice(t,1);
                    t--;
                }
            }
        }

        //Console Helper
        /*for(let i = 0; i <= indvidualColorsRGB.length - 1; i++)
        {
            console.log("indvidualColorsRGB_color_" + i + ": " + indvidualColorsRGB[i]);
        }*/

        if(indvidualColorsRGB.length > 1)
        {
            for(let j = 0; j <= 2; j++)
            {
                particularRGBResult = 0;

                for(let k = 0; k <= indvidualColorsRGB.length - 1; k++)
                {
                    elementsRGB = indvidualColorsRGB[k];

                    particularRGBElements[k] = elementsRGB[j];
                    //console.log(elementsRGB);
                }

                for(let k = 1; k <= particularRGBElements.length - 1; k++)
                {
                    particularRGBResult += 
                    (particularRGBElements[0]*1 - particularRGBElements[k])/(arrayColors.length/indvidualColorsRGBCoeff[indvidualColorsRGB[k]]); 

                    //console.log(indvidualColorsRGB[1] + "del : " + particularRGBElements.length/indvidualColorsRGBCoeff[indvidualColorsRGB[1]]);
                }

                finalColorRGBElements[j] = Math.abs(particularRGBElements[0]*1 - particularRGBResult);

                //console.log(j + ':' + particularRGBElements[0]*1 + ' ' + particularRGBResult)
            }
        }
        else if(indvidualColorsRGB.length == 1)
        {
            for(let k = 0; k <= arrayColors.length -1; k++)
            {
                indvidualColorsRGB[k] = arrayColors[k].split(rgbValueRegex);
                indvidualColorsRGB[k].shift();
                indvidualColorsRGB[k].pop();
            }

            colors = indvidualColorsRGB[0];

            for(let k = 0; k <= indvidualColorsRGB[0].length - 1; k++)
            {
                finalColorRGBElements[k] = colors[k];
            }
        }
    }
    else if(arrayColors.length == 1)
    {
        for(let k = 0; k <= arrayColors.length -1; k++)
        {
            indvidualColorsRGB[k] = arrayColors[k].split(rgbValueRegex);
            indvidualColorsRGB[k].shift();
            indvidualColorsRGB[k].pop();
        }

        colors = indvidualColorsRGB[0];

        for(let k = 0; k <= indvidualColorsRGB[0].length - 1; k++)
        {
            finalColorRGBElements[k] = colors[k];
        }
    }
    
    if(!isLocked[2])
    {      
        allColorResult[2].style.backgroundColor = "rgb(" + finalColorRGBElements[0] + ',' + finalColorRGBElements[1] + ',' + finalColorRGBElements[2] + ")";
        RgbToHex(allColorResult[2].style.backgroundColor);
    }

    SetAdditionalColors(finalColorRGBElements);

    ResultInfoColor();
    
        //console.log("MAIN COLOR: " + allColorResult[2].style.backgroundColor);
        //console.log(indvidualColorsRGB[t]);        
}

function LanguageListSwitch()
{
    if(allLanguagesMobile[1].style.animationName == '' || allLanguagesMobile[1].style.animationName == 'LanguageMenuUpMobile')
    {
        allLanguagesMobile[1].style.animationName = "LanguageMenuDownMobile";
    }
    else
    {
        allLanguagesMobile[1].style.animationName = "LanguageMenuUpMobile";
    }
}

function ShowLanguageListTouch(e)
{
    if(this == e.target)
    {
        allLanguagesPC[1].style.animationName = "LanguageMenuDown";
        allLanguagesPC[0].addEventListener('touchstart', CloseLanguageListTouch,{once:true});
    }
}
function CloseLanguageListTouch(e)
{
    if(this == e.target)
    {
        allLanguagesPC[1].style.animationName = "LanguageMenuUp";
        allLanguagesPC[0].addEventListener('touchstart', ShowLanguageListTouch,{once:true});
    }
}

function ShowLanguageList()
{
    allLanguagesPC[1].style.animationName = "LanguageMenuDown";
}
function CloseLanguageList()
{
    allLanguagesPC[1].style.animationName = "LanguageMenuUp";
}

/*unction SetLanguage()
{   
    SetCookie('lang',this.innerText,3);
    
    allLanguages[1].style.display = "none";
    
    LanguageCookie();
    
    location.reload();
}*/

function ColorSave()
{
    var canvas = document.createElement("canvas");
    
    canvas.width = allColorResult[2].offsetWidth;
    canvas.height = allColorResult[2].offsetHeight;
    canvas.style.position = "absolute";
    canvas.style.zIndex = 1;
    canvas.style.borderRadius = "0.7em";
    
    allColorResult[2].parentElement.appendChild(canvas);
    
    var ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#" + allColorsHexResults[0].value;
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.fillStyle = "#" + allColorsHexResults[1].value;
    ctx.fillRect(0,0, allColorResult[0].offsetWidth, allColorResult[0].offsetHeight);

    ctx.fillStyle = "#" + allColorsHexResults[2].value;
    ctx.fillRect(0,allColorResult[0].offsetHeight, allColorResult[1].offsetWidth, allColorResult[1].offsetHeight);

    ctx.fillStyle = "#" + allColorsHexResults[3].value;
    ctx.fillRect(canvas.width - allColorResult[3].offsetWidth ,0, allColorResult[3].offsetWidth, allColorResult[3].offsetHeight);

    ctx.fillStyle = "#" + allColorsHexResults[4].value;
    ctx.fillRect(canvas.width - allColorResult[4].offsetWidth,allColorResult[3].offsetHeight, allColorResult[4].offsetWidth, allColorResult[4].offsetHeight);
    
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    allOptions[1].setAttribute("href", image);
    
    allColorResult[2].parentElement.removeChild(canvas);
}

function ColorBehance()
{
    allOptions[2].setAttribute("href","https://www.behance.net/search/projects?color_hex=" + RgbToHex(allColorResult[2].style.backgroundColor));
}
function OptionTextUpdate()
{
    if(mobileVersion)
    {
        if(optionText[2].style.display == 'flex')
        {
            if(!allColorResult[0].classList.contains('ah'))
            {
                optionText[0].style.display = 'flex';
                optionText[3].style.display = 'flex';
            }
            else
            {
                optionText[0].style.display = 'none';
                optionText[3].style.display = 'none'; 
            }
            if(!allColorResult[4].classList.contains('ah'))
            {
                optionText[1].style.display = 'flex';
                optionText[4].style.display = 'flex';
            }
            else
            {
                optionText[1].style.display = 'none';
                optionText[4].style.display = 'none';
            }
        }
    }
    else
    {        
        if(optionText[2].style.display == 'flex')
        {
            if(!allColorResult[0].classList.contains('ah'))
            {
                optionText[0].style.display = 'flex';
                optionText[1].style.display = 'flex';
            }
            else
            {
                optionText[0].style.display = 'none';
                optionText[1].style.display = 'none'; 
            }
            if(!allColorResult[4].classList.contains('ah'))
            {
                optionText[3].style.display = 'flex';
                optionText[4].style.display = 'flex';
            }
            else
            {
                optionText[3].style.display = 'none';
                optionText[4].style.display = 'none';
            }
        }
    }
}
function OptionText()
{
    if(mobileVersion)
    {
        if(optionText[2].style.display == 'flex')
        {
            optionText[0].style.display = 'none';
            optionText[1].style.display = 'none';
            optionText[2].style.display = 'none';
            optionText[3].style.display = 'none';
            optionText[4].style.display = 'none';
        }
        else
        {
            optionText[2].style.display = 'flex';

            if(!allColorResult[0].classList.contains('ah'))
            {
                optionText[0].style.display = 'flex';
                optionText[3].style.display = 'flex';
            }
            if(!allColorResult[4].classList.contains('ah'))
            {
                optionText[1].style.display = 'flex';
                optionText[4].style.display = 'flex';
            }
        } 
    }
    else
    {
        if(optionText[2].style.display == 'flex')
        {
            optionText[0].style.display = 'none';
            optionText[1].style.display = 'none';
            optionText[2].style.display = 'none';
            optionText[3].style.display = 'none';
            optionText[4].style.display = 'none';
        }
        else
        {
            optionText[2].style.display = 'flex';

            if(!allColorResult[0].classList.contains('ah'))
            {
                optionText[0].style.display = 'flex';
                optionText[1].style.display = 'flex';
            }
            if(!allColorResult[4].classList.contains('ah'))
            {
                optionText[3].style.display = 'flex';
                optionText[4].style.display = 'flex';
            }
        }        
    }
    
}
function OptionInfo()
{
    tempOpacity = allColorsHexResults[0].style.opacity == 1 ? 0 : 1;
    tempOpacityCloseBtn = tempOpacity == 1 ? 0.2 : 0;
    tempOpacityCloseBtnSvg = tempOpacity == 1 ? 0.5 : 0;

    for(let i = 0; i <= allColorsHexResults.length - 1; i++)
    {
        allColorsHexResults[i].style.opacity = tempOpacity;
        allRgbContainers[i].style.opacity = tempOpacity;
        allColorsHex[i].style.opacity = tempOpacity;
        allCopyColorBtns[i].style.opacity = tempOpacity;
        allCloseBtn[i].style.opacity = tempOpacityCloseBtn;
        allCloseBtnIcons[i].style.opacity = tempOpacityCloseBtnSvg;
    }
    for(let i = 0; i <= colorHexUnselectable.length - 1; i++)
    {
        colorHexUnselectable[i].style.opacity = tempOpacity;
    }
    
    resLeftArrow.style.opacity = tempOpacity;
    resRightArrow.style.opacity = tempOpacity;
}
function ColorCheck()
{       
    allColorsCheck = [];
 
    for(let i = 0; i <= allColorBtns.length - 1; i++)
    {
        if(allColorBtns[i].children[0].style.backgroundColor != "")
        {
            allColorsCheck[i] = allColorBtns[i].children[0].style.backgroundColor;
            //console.log("colorCheck Added ["+i+"]: " + allColorsCheck[i]);  
            BtnCloseColor(allColorBtns[i].children[0])
            allColorsHex[i].value = RgbToHex(allColorsCheck[i]);
            BtnHexColor(allColorBtns[i].children[0], allColorsHex[i]);
            
        }
    }
    //console.log("allColorBtns.lenght = " + allColorsCheck.length);
    
    /*for(let i = 0; i <= allColorsCheck.length - 1; i++)
    {
        console.log("allColorsCheck["+i+"]: " + allColorsCheck[i]);   
    }*/
    
    return allColorsCheck;
}

function ColorBtnsFlexGrowUpdate()
{
    for(let i = 0; i <= activeColorBtns - 1; i++)
    {
        allColorBtns[i].style.height = "100%";

        if(i <= activeColorBtns)
        {
            allColorBtns[i].style.flexGrow = "1";
            allColorBtns[i].style.bottom = 0;
        }
    } 
    
    btnColorChangeActive = "";
    colorChangeMenu.style.display = "none";
}

function ResultColorUpdate()
{    
    ColorResultSet(ColorCheck());
    BtnCloseColor(btnColorChangeActive);
}

function ResultColorToHex()
{
    for(let i = 0; i <= allColorResult.length - 1; i++)
    {   
        if(!isLocked[i])
        {
            allColorResult[i].children[1].value = RgbToHex(allColorResult[i].style.backgroundColor);

            rgb = HexToRgb('#' + allColorResult[i].children[1].value);

            rgb = rgb.split(rgbValueRegex);
            rgb.pop();
            rgb.shift();

            tempBtnPosName =  allColorResult[i].getAttribute('class').match(rgbHelperRegex);

            //console.log(tempBtnPosName);
            
            document.getElementsByClassName("RGB_result_input" + tempBtnPosName[0])[0].innerHTML = rgb[0] + ' ' + rgb[1] + ' ' + rgb[2];
        }
    }
}

function AboutSiteOpen()
{
    aboutSiteMinimize.removeEventListener("mouseup",AboutSiteOpen);
    aboutSiteMinimize.addEventListener("mouseup",AboutSiteClose);
    
    this.children[0].style.transform = "";
    this.children[1].style.transform = "";
    
    temp = aboutSite.getElementsByTagName('p');
    
    for(let i = 0; i <= temp.length - 1; i++)
    {
        temp[i].style.display = "block";
    }
}

function AboutSiteClose()
{    
    aboutSiteMinimize.removeEventListener("mouseup",AboutSiteClose);
    aboutSiteMinimize.addEventListener("mouseup",AboutSiteOpen);
    
    this.children[0].style.transform = "rotate(-25deg)";
    this.children[1].style.transform = "rotate(25deg)";
    
    temp = aboutSite.getElementsByTagName('p');
    
    for(let i = 0; i <= temp.length - 1; i++)
    {
        temp[i].style.display = "none";
    }
}
function HuePickingMouseDown(event)
{
    hueColorPicking = 1;
    
    if(mobileVersion)
        document.body.parentElement.style.overflowY = 'hidden';
    if(screen600orLess)
        colorChangeMenu.style.overflowY = 'hidden';    
    
    HuePickerPositionY(event);
    
    HueColorCalculation();
    
    if(mobileVersion)
    {
        document.ontouchmove = HuePickingMouseHold;
    }
    else
    {
        document.onmousemove = HuePickingMouseHold;
    }
}
function PickingMouseDown(event)
{
    colorPicking = 1;
    
    if(mobileVersion)
        document.body.parentElement.style.overflowY = 'hidden';
    if(screen600orLess)
        colorChangeMenu.style.overflowY = 'hidden';
    
    PickerPositionY(event);
    PickerPositionX(event);
    
    ColorCalculation();
    
    if(mobileVersion)
    {
        document.ontouchmove = PickingMouseHold;
    }
    else
    {
        document.onmousemove = PickingMouseHold;
    }
    
    //console.log('X: ' + event.touches[0].clientX + ' Y: ' + event.touches[0].clientY); 
}
function HueColorCalculation()
{
    hueColor = 'hsl(' + Math.round(huePicker.style.top.split('%')[0] * 3.6) + ',' + '100%' + ',' + '50%)';
    
    huePicker_color.style.backgroundColor = hueColor;
    
    colorBox_color.style.backgroundColor = hueColor;
    
    ColorCalculation();
    
    //console.log(hueColor);
}
function HuePickingMouseHold(event)
{
    if(hueColorPicking == 1)
    {  
        //if stopY = 0 then u can't move hue picker
        //if stopY = 1 then u can move hue picker
        if(stopY == 0)
             HuePickerPositionY(event);
        
        //if position of cursor <= left colorBox
        
        if(event.clientY <= hueTop)
        {
            stopY = 1;
            
            huePicker.style.top = '0%';
        }
        else if(event.clientY - hueTop.offsetTop - colorChangeMenu.offsetTop - huePickerWidthHalf >= hueBottom)
        {
            stopY = 1;
            
            huePicker.style.top = '100%';
        }
        else
        {
            stopY = 0;
        }
        
        HueColorCalculation();
        
        //console.log(huePicker.style.top);
    }
}
function HuePickerPositionY(event)
{    
    if(screen600orLess)
    {
        curOffsetMenu = colorChangeMenu.scrollTop;
    }
    
    if(event.type == 'mousedown' || event.type == 'mousemove')
    {
        tempPosY = (event.clientY - colorChangeMenu.offsetTop - colorHueOffset + window.pageYOffset)/colorHue.offsetHeight * 100;
    }
    else if(event.type == 'touchstart' || event.type == 'touchmove')
    {
        tempPosY = (event.touches[0].clientY - colorChangeMenu.offsetTop - colorHueOffset + curOffset + curOffsetMenu)/colorHue.offsetHeight * 100;
    }
    huePicker.style.top = tempPosY + '%'; // change picker positon Y
    
    if(huePicker.style.top.split('%')[0] <= 0)
    {
        huePicker.style.top ='0%';
    }
    else if(huePicker.style.top.split('%')[0] >= 100)
    {
        huePicker.style.top = '100%';
    }
}
function PickerPositionX(event)
{
    //console.log("Mouse x: " + event.clientX + " Mouse y: " + event.clientY);
    if(event.type == 'mousedown' || event.type == 'mousemove')
    {
        tempPosX = (event.clientX - colorChangeMenu.offsetLeft - colorBox.offsetLeft)/colorBox.offsetWidth * 100;
    }
    else if(event.type == 'touchstart' || event.type == 'touchmove')
    {   
        tempPosX = (event.touches[0].clientX - colorChangeMenu.offsetLeft - offsetLeftTemp)/colorBox.offsetWidth * 100;
    }
            
    picker.style.left = tempPosX.toFixed(2) + '%'; // change picker positon X
    
    // if picker position > colorBox right
    if(picker.style.left.split('%')[0] >= 100)
    {
        picker.style.left = '100%';
    }
    else if(picker.style.left.split('%')[0] <= 0)
    {
        picker.style.left = '0%';
    }
}
function PickerPositionY(event)
{
    //console.log(event.type + ' is fired');
    
    if(screen600orLess)
    {
        curOffsetMenu = colorChangeMenu.scrollTop;        
    }
    
    if(event.type == 'mousedown' || event.type == 'mousemove')
    {
        tempPosY = (event.clientY - colorChangeMenu.offsetTop - colorBoxHueOffset + window.pageYOffset)/colorBox.offsetHeight * 100;
    }
    else if(event.type == 'touchstart' || event.type == 'touchmove')
    {
        tempPosY = (event.touches[0].clientY - colorChangeMenu.offsetTop - colorBoxHueOffset + curOffset + curOffsetMenu)/colorBox.offsetHeight * 100;
    }

    picker.style.top = tempPosY.toFixed(2) + '%'; // change picker positon Y
    
    if(picker.style.top.split('%')[0] <= 0)
    {
        picker.style.top ='0%';
    }
    else if(picker.style.top.split('%')[0] >= 100)
    {
        picker.style.top = '100%';
    }
}
function PickingMouseUp(event)
{
    if(!screen600orLess)
    {
        document.body.parentElement.style.overflowY = 'visible';
    }
    else
    {
        colorChangeMenu.style.overflowY = 'visible';
    }
    
    document.onmousemove = null;
    document.ontouchmove = null;
    
    colorPicking = 0;
    hueColorPicking = 0;
}
function PickingMouseHold(event)
{
    if(colorPicking == 1)
    {
        boxTop = colorChangeMenu.offsetTop + colorBox.offsetTop - pickerWidthHalf - window.pageYOffset;
        boxBottom = boxTop + colorBox.offsetHeight;
        boxLeft = colorChangeMenu.offsetLeft + colorBox.offsetLeft - pickerWidthHalf;
        boxRight = boxLeft + colorBox.offsetWidth;
        
        //if stopX = 0 then user can change X position of picker
        //if stopX = 1 then user cannot change X position of picker
        if(stopX == 0)
            PickerPositionX(event);
           
        if(stopY == 0)
             PickerPositionY(event);
        
        //if position of cursor <= left colorBox
        if(event.clientX <= boxLeft)
        {
            stopX = 1;

            picker.style.left = '0%';
        }//if position of cursor >= right colorBox
        else if(event.clientX >= boxRight)
        {
            stopX = 1;
            
            picker.style.left = '100%';
        }
        else
        {
            stopX = 0;
        }
        
        if(event.clientY <= boxTop)
        {
            stopY = 1;
            
            picker.style.top = '0%';
        }
        else if(event.clientY - colorBox.offsetTop - colorChangeMenu.offsetTop - pickerWidthHalf >= boxBottom)
        {
            stopY = 1;
            
            picker.style.top = '100%';
        }
        else
        {
            stopY = 0;
        }
        
        ColorCalculation();
        
        //console.log("Picker  x%: " + picker.style.left + " Picker y%: " + picker.style.top);
    }
}
function ColorCalculation()
{    
    rgb = colorBox_color.style.backgroundColor.split(rgbValueRegex);
    rgb.shift();
    rgb.pop();
    
    picker_left = picker.style.left.split('%')[0];
    picker_top = picker.style.top.split('%')[0];
    
    //picker_left = window.getComputedStyle(picker,null).getPropertyValue('left');
    
    rgbProc = [];
    rgbColorX = [];
    rgbColorXProc = [];
    rgbColorY = [];
    
    for(let i = 0; i <= rgb.length - 1; i++)
    {
        rgbProc[i] = (255 - rgb[i])/255;
        
        rgbColorX[i] = Math.round(255 - (((rgbProc[i]  * picker_left)*255)/100));
        
        rgbColorXProc[i] = ((255 - rgbColorX[i])/255);
        
        rgbColorY[i] = Math.round(rgbColorX[i] - (((Math.abs( rgbColorXProc[i] - 1)  * picker_top)*255)/100));
        
        menuRGBInfo[i].value = rgbColorY[i];
    }
    
    /*rColorX = Math.round(255 - (((rProc  * picker_left)*255)/100));
    gColorX = Math.round(255 - (((gProc  * picker_left)*255)/100));
    bColorX = Math.round(255 - (((bProc  * picker_left)*255)/100));
    
    rColorXProc = ((255 - rColorX)/255);
    gColorXProc = ((255 - gColorX)/255);
    bColorXProc = ((255 - bColorX)/255);
    
    rColorY = Math.round(rColorX - (((Math.abs(rColorXProc - 1)  * picker_top)*255)/100));
    gColorY = Math.round(gColorX - (((Math.abs(gColorXProc - 1)  * picker_top)*255)/100));
    bColorY = Math.round(bColorX - (((Math.abs(bColorXProc - 1)  * picker_top)*255)/100));*/

    //console.log('rProc: ' + rgbProc[0] + ' gProc: ' + rgbProc[1] + ' bProc: ' + rgbProc[2]);
    //console.log('rColorX: ' + rgbColorX[0] + ' gColorX: ' + rgbColorX[1] + ' bColorX: ' + rgbColorX[2]);
    //console.log('rColorY: ' + rgbColorY[0] + ' gColorY: ' + rgbColorY[1] + ' bColorY: ' + rgbColorY[2]);
    
    newColor.style.backgroundColor = 'rgb(' + rgbColorY[0] + ',' + rgbColorY[1] + ',' + rgbColorY[2] + ')';
    
    picker_color.style.backgroundColor = 'rgb(' + rgbColorY[0] + ',' + rgbColorY[1] + ',' + rgbColorY[2] + ')';
    
    hex.value = '#' + RgbToHex(newColor.style.backgroundColor).toUpperCase();
    //console.log(btnColorChangeActive);
    btnColorChangeActive.style.backgroundColor = newColor.style.backgroundColor;
    
    ResultColorUpdate();
}
function CheckSavedColors()
{
    for(let i = 0; i <= saveColors.length - 1; i++)
    {
        //console.log(saveColors[i].style.backgroundColor);
        if(saveColors[i].style.backgroundColor == 'transparent' && window.getComputedStyle(saveColors[i], null).display  == 'block')
        {         
            saveColors[selectedSlot].style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 2px 12px 0px';
            saveColors[selectedSlot].style.borderColor = 'rgba(255, 255, 255, 0.0)';
            
            selectedSlot = parseInt(saveColors[i].getAttribute('class').split(' sC_')[1]);
            
            saveColors[i].style.boxShadow = 'rgba(255, 255, 255, 0.1) 0px 2px 2px 0px, rgba(255, 255, 255, 0.2) 0px 2px 12px 0px';
            saveColors[i].style.borderColor = 'rgba(255, 255, 255, 0.5)';
            
            break;
        }        
    }  
}
function UpdateSavedColorsCookie()
{
    scCookie = savedColorsRGB[0] + '-';
    
    for(let i = 1; i <= savedColorsRGB.length - 1; i++)
    {
        scCookie += savedColorsRGB[i] + '-';
    }
    
    scCookie += '|' + savedColorsPos[0][0] + ' ' + savedColorsPos[0][1] + '-';
    for(let t = 1; t <= savedColorsPos.length - 1; t++)
    {
        scCookie += savedColorsPos[t][0] + ' ' + savedColorsPos[t][1] + '-';
    }
    
    //console.log(scCookie);
    
    SetCookie('clrmashSC', scCookie, 240);
}
function SaveColorFunction()
{
    saveColors[selectedSlot].style.background = newColor.style.backgroundColor;
    
    savedColorsPos[selectedSlot][0] = picker.style.left;
    savedColorsPos[selectedSlot][1] = picker.style.top;
    
    savedColorsRGB[selectedSlot] = newColor.style.backgroundColor;
    
    //console.table(savedColorsHex);
    
    if(isCookieActive == 1)
    {
        UpdateSavedColorsCookie();
    }
    
    simColorTemp = ColorSimilar(newColor);

    if(saveColors[selectedSlot].children[0].style.display != 'block')
    {
        saveColors[selectedSlot].children[0].style.display = 'block';
        saveColors[selectedSlot].children[0].style.fill = simColorTemp;

        saveColors[selectedSlot].children[1].style.display = 'block';
        saveColors[selectedSlot].children[1].style.fill = simColorTemp;
    }
    
    CheckSavedColors();
}
function CheckSavedColorsCookie()
{
    colorsCookie = CheckCookie('clrmashSC');
    
    if(colorsCookie != '0')
    {
        temp = colorsCookie.split('|');
        
        colorsTemp = temp[0].split('-');
        posTemp = temp[1].split('-');
        
        for(let i = 0; i <= saveColors.length - 1; i++)
        {   
            savedColorsPos[i][0] = posTemp[i].split(' ')[0];
            savedColorsPos[i][1] = posTemp[i].split(' ')[1];
            
            savedColorsRGB[i] = colorsTemp[i];
            
            if(colorsTemp[i] != '0')
            {   
                saveColors[i].style.background = colorsTemp[i];
                simColorTemp = ColorSimilar(saveColors[i]);

                saveColors[i].children[0].style.display = 'block';
                saveColors[i].children[0].style.fill = simColorTemp;

                saveColors[i].children[1].style.display = 'block';
                saveColors[i].children[1].style.fill = simColorTemp;
            }
        }
        //console.table(savedColorsPos);
    }
        CheckSavedColors();
}
function SelectSlotSaveColor(e)
{
    if(this == e.target)
    {
        saveColors[selectedSlot].style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 2px 12px 0px';
        saveColors[selectedSlot].style.borderColor = 'rgba(255, 255, 255, 0.0)';

        selectedSlot = parseInt(this.getAttribute('class').split(' sC_')[1]);
        
        //console.log('selectedSlot: ' + selectedSlot);

        this.style.boxShadow = 'rgba(255, 255, 255, 0.1) 0px 2px 2px 0px, rgba(255, 255, 255, 0.2) 0px 2px 12px 0px';
        this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    }
}
function ShowMoreSavedColors()
{
    if(!colorChangeMenu.classList.contains('open'))
    {
        colorChangeMenu.classList.add('open');
        
        colorChangeMenu.style.height = '25.6em';
        
        if(!siteEn)
            more.innerHTML = 'меньше';
        else
            more.innerHTML = 'less';
        
        more.classList.add('moreDown');
        
        svgMoreArrowDown.classList.add('svgMoreArrowUp')
        
        for(let i = 5; i <= saveColors.length - 1; i++)
        {
            saveColors[i].style.display = 'block';
        }   
    }
    else
    {
        colorChangeMenu.classList.remove('open');
        
        colorChangeMenu.style.height = '21.94em';
        
        if(!siteEn)
            more.innerHTML = 'ещё';
        else
            more.innerHTML = 'more';
        
        more.classList.remove('moreDown');
        
        svgMoreArrowDown.classList.remove('svgMoreArrowUp')
        
        for(let i = 5; i <= saveColors.length - 1; i++)
        {
            saveColors[i].style.display = 'none';
        } 
    }
}
function RemoveSavedColor()
{
    scNumber = this.parentElement.getAttribute('class').split(' sC_')[1];
    
    saveColors[scNumber].style.background = sC_NoColor;
    saveColors[scNumber].style.backgroundColor = 'transparent';
    
    savedColorsRGB[scNumber] = '0';
    savedColorsPos[scNumber][0] = '0';
    savedColorsPos[scNumber][1] = '0';
    
    scCopyAll[scNumber].style.display = 'none';
    scCloseAll[scNumber].style.display = 'none';
    
    if(isCookieActive == 1)
    {
        UpdateSavedColorsCookie();
    }
}
function ChangeColor(rgb, hexTemp = 0)
{
    if(rgb[0] == 'r')
    {
        rgb = rgb.split(rgbValueRegex);
        
        rgb.shift();
        rgb.pop();
    }
    if(hexTemp == 0)
    {
        hexTemp = RgbToHex('rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')');
        
        if(ValidHex('#' + hexTemp))
        {
            hex.value = '#' + hexTemp.toUpperCase();        
        }
    }
    
    //console.log(rgb);
    
    oldColorHex = hex.value;
    
    for(let i = 0; i <= rgb.length - 1; i++)
    {
        if(rgb[i] != menuRGBInfo[i].value)
        {
           menuRGBInfo[i].value = rgb[i];
        }
    }
    
    hueTemp = RgbToHUE(rgb[0],rgb[1],rgb[2]);

    colorBox_color.style.backgroundColor = 'hsl(' + hueTemp + ', 100%,50%)';

    huePicker_color.style.backgroundColor = 'hsl(' + hueTemp + ', 100%,50%)';
    huePicker.style.top = hueTemp/3.6 + '%';
    
    rgbTopRight = hslToRgb(hueTemp,100,50);
    
    for(let i = 0; i <= 2; i++)
    {
        if(rgbTopRight[i] == 255)
        {
            picker.style.top = (((rgbTopRight[i] - rgb[i])/255) * 100) + '%';
            
            for(let t = 0; t <= 2; t++)
            {
                if(t != i && rgbTopRight[t] == 0)
                {
                    temp = (100 - ((rgb[t]/rgb[i]) * 100));
                    
                    picker.style.left = temp + '%';
                }
            }
        }
    }
       //tempPosY = (event.clientY - colorChangeMenu.offsetTop - colorBox.offsetTop + window.pageYOffset)/colorBox.offsetHeight * 100;
    newColor.style.backgroundColor = 'rgb(' + menuRGBInfo[0].value + ',' + menuRGBInfo[1].value + ',' + menuRGBInfo[2].value + ')';

    picker_color.style.backgroundColor = newColor.style.backgroundColor;
    
    btnColorChangeActive.style.backgroundColor = newColor.style.backgroundColor;
    
    ResultColorUpdate();
}
function RGBChanged()
{    
    if(this.value >= 0 && this.value <= 255)
    {
        ChangeColor([menuRGBInfo[0].value,menuRGBInfo[1].value,menuRGBInfo[2].value]);
    }
    else
    {
        rgb = newColor.style.backgroundColor.split(rgbValueRegex);
        rgb.shift();
        rgb.pop();
        
        for(let i = 0; i <= menuRGBInfo.length - 1; i++)
        {
            menuRGBInfo[i].value = rgb[i];
        }
    }
}
function HEXChanged()
{
    if(ValidHex('#' + this.value))
    {
        this.value = '#' + this.value;
    }
    
    //console.log('hexchange: ' + this.value);
    if(ValidHex(this.value))
    {
        rgb = HexToRgb(this.value).split(rgbValueRegex);
        rgb.shift();
        rgb.pop();
        
        for(let i = 0; i <= menuRGBInfo.length - 1; i++)
        {
            menuRGBInfo[i].value = rgb[i];
        }
        
        ChangeColor([rgb[0],rgb[1],rgb[2]],this.value);
    }
    else
    {
        hex.value = '#' + RgbToHex(newColor.style.backgroundColor).toUpperCase();
    }
}
function CopySavedColor()
{    
    scNumber = this.parentElement.getAttribute('class').split(' sC_')[1];
    
    colorTemp = saveColors[scNumber].style.backgroundColor;
    
    newColor.style.backgroundColor = colorTemp;
    
    rgb = colorTemp.split(rgbValueRegex);
    rgb.shift();
    rgb.pop();
    
    for(let i = 0; i <= rgb.length - 1; i++)
    {
        menuRGBInfo[i].value = rgb[i];
    }
    
    hueTemp = RgbToHUE(rgb[0],rgb[1],rgb[2]);
    
    colorBox_color.style.backgroundColor = 'hsl(' + hueTemp + ', 100%,50%)';
   
    huePicker_color.style.backgroundColor = 'hsl(' + hueTemp + ', 100%,50%)';
    huePicker.style.top = hueTemp/3.6 + '%';
    
    hex.value = '#' + RgbToHex('rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')').toUpperCase();
    
    picker.style.left = savedColorsPos[scNumber][0];
    picker.style.top = savedColorsPos[scNumber][1];
    picker_color.style.backgroundColor = colorTemp;
    
    btnColorChangeActive.style.backgroundColor = newColor.style.backgroundColor;
    
    ResultColorUpdate();
}
function CopyColor(elementWeCopyFrom)
{
    colorTemp = elementWeCopyFrom.style.backgroundColor;
    //console.log(elementWeCopyFrom.style.backgroundColor);
    newColor.style.backgroundColor = colorTemp;
    
    rgb = colorTemp.split(rgbValueRegex);
    rgb.shift();
    rgb.pop();
    
    for(let i = 0; i <= rgb.length - 1; i++)
    {
        menuRGBInfo[i].value = rgb[i];
    }
    
    hueTemp = RgbToHUE(rgb[0],rgb[1],rgb[2]);
    
    colorBox_color.style.backgroundColor = 'hsl(' + hueTemp + ', 100%,50%)';
   
    huePicker_color.style.backgroundColor = 'hsl(' + hueTemp + ', 100%,50%)';
    huePicker.style.top = hueTemp/3.6 + '%';
    
    if(elementWeCopyFrom == oldColor)
    {
        hex.value = oldColorHex;

        picker.style.left = oldColorPosX;
        picker.style.top = oldColorPosY;
    }
    else
    {
        ChangeColor([rgb[0],rgb[1],rgb[2]]);
    }
    
    picker_color.style.backgroundColor = colorTemp;
    
    btnColorChangeActive.style.backgroundColor = newColor.style.backgroundColor;
    
    ResultColorUpdate();
}
function CopyOldColor()
{
    CopyColor(this);
}
function CookieAgree()
{
    cookieWindow.style.display = 'none';
    
    SetCookie('clrmashFT','-1', 160);
}
function CookieDisagree()
{
    cookieWindow.style.display = 'none';
    
    isCookieActive = 0;
    
    SetCookie('clrmashSC','0',-1);
    SetCookie('clrmashTh','0',-1);
}
function LockColor()
{
    numTemp = this.getAttribute('class').split('-')[1];
    //console.log(numTemp + ' is locked');
    if(this.children[0].style.display == 'none')
    {
        this.children[1].style.display = 'none';
        this.children[0].style.display = 'block';
        
        isLocked[numTemp[0]] = false;
        
        ColorResultSet(ColorCheck());
    }
    else
    {
        this.children[0].style.display = 'none';
        this.children[1].style.display = 'block';
        
        isLocked[numTemp[[0]]] = true;
    }
    
    //console.table(isLocked);
}
function RgbToHSL(color)
{
    var rgb = color.split(rgbValueRegex);
    rgb.shift();
    rgb.pop();

    rgb[0] /= 255, rgb[1] /= 255, rgb[2] /= 255;

    var max = Math.max(rgb[0], rgb[1], rgb[2]), 
          min = Math.min(rgb[0], rgb[1], rgb[2]);
    var h, s, l = (max + min) / 2;

    if (max == min) 
    {
      h = s = 0;
    } 
    else 
    {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) 
      {
        case rgb[0]: h = (rgb[1] - rgb[2]) / d + (rgb[1] < rgb[2] ? 6 : 0); break;
        case rgb[1]: h = (rgb[2] - rgb[0]) / d + 2; break;
        case rgb[2]: h = (rgb[0] - rgb[1]) / d + 4; break;
      }

      h /= 6;
    }

      return [ h*360, s*100, l*100 ];
}
function HslToRgb(h, s, l)
{
    if(h == 360)
    {
        h = 0;
    }
    
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
    
    if (0 <= h && h < 60)
    {
        r = c; g = x; b = 0;  
    } 
    else if (60 <= h && h < 120) 
    {
        r = x; g = c; b = 0;
    } 
    else if (120 <= h && h < 180)
    {
        r = 0; g = c; b = x;
    }
    else if (180 <= h && h < 240)
    {
        r = 0; g = x; b = c;
    } 
    else if (240 <= h && h < 300) 
    {
        r = x; g = 0; b = c;
    } 
    else if (300 <= h && h < 360)
    {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "rgb(" + r + "," + g + "," + b + ")";
}
function hslToRgb(h, s, l)
{
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
}
function RgbToHex(mainColorArray)
{
    var rgb = mainColorArray.split(rgbValueRegex);
    rgb.shift();
    rgb.pop();
    
    //console.log(rgb)
    var hextemp = "";
    var hex = "";
    
    for(let k = 0; k < rgb.length; k++)
    {
        hextemp = parseInt(rgb[k]).toString(16);
        
        if (hextemp.length < 2)
        {
           hextemp = "0" + hextemp;
        }
        
        hex += hextemp.substring(0,2);
    }
    
    //console.log(mainColorArray + " = " + hex);
    return hex;
}
function HexToRgb(hex) 
{
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? "rgb("+parseInt(result[1], 16)+','+parseInt(result[2], 16)+','+parseInt(result[3], 16)+')' : null;
}
function RgbToHUE(r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var c   = max - min;
    var hue;
    
    if (c == 0) 
    {
        hue = 0;
    } 
    else 
    {
        switch(max)
        {
          case r:
            var segment = (g - b) / c;
            var shift   = 0 / 60;       // R° / (360° / hex sides)
            if (segment < 0)
            {          // hue > 180, full rotation
              shift = 360 / 60;         // R° / (360° / hex sides)
            }
            hue = segment + shift;
            break;
          case g:
            var segment = (b - r) / c;
            var shift   = 120 / 60;     // G° / (360° / hex sides)
            hue = segment + shift;
            break;
          case b:
            var segment = (r - g) / c;
            var shift   = 240 / 60;     // B° / (360° / hex sides)
            hue = segment + shift;
            break;
        }
    }
    
    return hue * 60; // hue is in [0,6], scale it up
}
function MobileMenuToggle(e)
{
    if(this == e.target)
    {
        if(header_menu_mobile_content.style.left == '0em')
        {
            header_menu_mobile_content.style.left = '-100vw';
        }
        else
        {
            header_menu_mobile_content.style.left = '0em';
        }
    }
}