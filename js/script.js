/* usage
    BrowserDetect.browser == 'Explorer';
    BrowserDetect.version <= 9;
 */


var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [
            {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
            {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
        ]
 };
 BrowserDetect.init();

var body = document.body;
var browser = BrowserDetect.browser;
var vc= '';

switch(browser) {
    case 'MS Edge': vc = 'edge-'; break;
    case 'Explorer': vc = 'ie-'; break;
    case 'Chrome': vc = 'chrome-'; break;
    case 'Safari': vc = 'safari-'; break;
    case 'Firefox': vc = 'firefox-'; break;
    case 'Opera': vc = 'opera-'; break;
}

if(vc) {
    body.className = body.className + " " + vc +   parseInt(BrowserDetect.version);
}
/*! simplestatemanager | license: MIT | version: 3.3.0 | build date: 2016-09-20 */
!function(a,b,c,d){"function"==typeof define&&define.amd?define(function(){return d(a,b,c)}):"object"==typeof exports?module.exports=d:a.ssm=d(a,b,c)}(window,document,void 0,function(a,b,c){"use strict";function d(a){this.message=a,this.name="Error"}function e(a){this.id=a.id||i(),this.query=a.query||"all",delete a.id,delete a.query;var b={onEnter:[],onLeave:[],onResize:[],onFirstRun:[]};return this.options=h(b,a),"function"==typeof this.options.onEnter&&(this.options.onEnter=[this.options.onEnter]),"function"==typeof this.options.onLeave&&(this.options.onLeave=[this.options.onLeave]),"function"==typeof this.options.onResize&&(this.options.onResize=[this.options.onResize]),"function"==typeof this.options.onFirstRun&&(this.options.onFirstRun=[this.options.onFirstRun]),this.testConfigOptions("once")===!1?(this.valid=!1,!1):(this.valid=!0,this.active=!1,void this.init())}function f(b){this.states=[],this.resizeTimer=null,this.configOptions=[],a.addEventListener("resize",k(this.resizeBrowser.bind(this),l),!0)}function g(a,b,c){for(var d=a.length,e=[],f=0;f<d;f++){var g=a[f];g[b]&&g[b]===c&&e.push(g)}return e}function h(a,b){var c={};for(var d in a)c[d]=a[d];for(var e in b)c[e]=b[e];return c}function i(){for(var a="",b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;c<10;c++)a+=b.charAt(Math.floor(Math.random()*b.length));return a}function j(a){for(var b=a.length,c=0;c<b;c++)a[c]()}function k(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}var l=25,m=function(){};return e.prototype={init:function(){this.test=a.matchMedia(this.query),this.test.matches&&this.testConfigOptions("match")&&this.enterState(),this.listener=function(a){var b=!1;a.matches?this.testConfigOptions("match")&&(this.enterState(),b=!0):(this.leaveState(),b=!0),b&&m()}.bind(this),this.test.addListener(this.listener)},enterState:function(){j(this.options.onFirstRun),j(this.options.onEnter),this.options.onFirstRun=[],this.active=!0},leaveState:function(){j(this.options.onLeave),this.active=!1},resizeState:function(){this.testConfigOptions("resize")&&j(this.options.onResize)},destroy:function(){this.test.removeListener(this.listener)},attachCallback:function(a,b,c){switch(a){case"enter":this.options.onEnter.push(b);break;case"leave":this.options.onLeave.push(b);break;case"resize":this.options.onResize.push(b)}"enter"===a&&c&&this.active&&b()},testConfigOptions:function(a){for(var b=this.configOptions.length,c=0;c<b;c++){var d=this.configOptions[c];if("undefined"!=typeof this.options[d.name]&&d.when===a&&d.test.bind(this)()===!1)return!1}return!0},configOptions:[]},f.prototype={addState:function(a){var b=new e(a);return b.valid&&this.states.push(b),b},addStates:function(a){for(var b=a.length-1;b>=0;b--)this.addState(a[b]);return this},getState:function(a){for(var b=this.states.length-1;b>=0;b--){var c=this.states[b];if(c.id===a)return c}},isActive:function(a){var b=this.getState(a)||{};return b.active||!1},getStates:function(a){var b=null,c=[];if("undefined"==typeof a)return this.states;b=a.length;for(var d=0;d<b;d++)c.push(this.getState(a[d]));return c},removeState:function(a){for(var b=this.states.length-1;b>=0;b--){var c=this.states[b];c.id===a&&(c.destroy(),this.states.splice(b,1))}return this},removeStates:function(a){for(var b=a.length-1;b>=0;b--)this.removeState(a[b]);return this},removeAllStates:function(){for(var a=this.states.length-1;a>=0;a--){var b=this.states[a];b.destroy()}this.states=[]},addConfigOption:function(a){var b={name:"",test:null,when:"resize"};a=h(b,a),""!==a.name&&null!==a.test&&e.prototype.configOptions.push(a)},removeConfigOption:function(a){for(var b=e.prototype.configOptions,c=b.length-1;c>=0;c--)b[c].name===a&&b.splice(c,1);e.prototype.configOptions=b},getConfigOption:function(a){var b=e.prototype.configOptions;if("string"!=typeof a)return b;for(var c=b.length-1;c>=0;c--)if(b[c].name===a)return b[c]},getConfigOptions:function(){return e.prototype.configOptions},resizeBrowser:function(){for(var a=g(this.states,"active",!0),b=a.length,c=0;c<b;c++)a[c].resizeState()},stateChange:function(a){if("function"!=typeof a)throw new d("Not a function");m=a}},new f});
/************ isotope *****************/

window.onload = function(){
    let gallery = document.querySelector('.portfolio__images');
    let iso = new Isotope( gallery, {
        // options
        itemSelector: '.portfolio__images_item',
        fitWidth: true,
        percentPosition: true,
        masonry: {
            columnWidth: '.portfolio__images_item',
            gutter: 10,
        }

    });

    document.addEventListener('click', function(e){
        const target = e.target;
        if(!target.classList.contains('portfolio__links_item')) {
            return false;
        }
        const filterValue = e.target.getAttribute("data-filter");
        iso.arrange({filter: filterValue});
        // методом .arrange() "упорядычиваю" "изотоп" галереи
        // метод .arrange() - 
    });

    let linksArray = document.querySelectorAll(".portfolio__links_item");
    for (let i=0; i<linksArray.length; i++){
        let linkFromArray = linksArray[i];
        portfolioLinksGroup(linkFromArray);
    }

    function portfolioLinksGroup (linkFromArray) {
        linkFromArray.addEventListener("click", function(e){
            if(!this.classList.contains('portfolio__links_item')) {
                return false;
            }
            document.querySelector(".portfolioCurrentClass").classList.remove("portfolioCurrentClass");
           
            e.target.classList.add("portfolioCurrentClass");
        });
    }
};
/************ end of isotope ***************/



{
    'use strict';
    let btnUp = document.getElementById("btnUp");

    let scrolled; // показания прокрутки из window.pageYOffset;
    let timer; // время отсчета прокрутки
    let coords = document.documentElement.clientHeight;
    // Свойства clientWidth/Height для элемента document.documentElement – это как раз ширина/высота видимой области окна.
    // Это свойство доступно только для чтения.

    window.onscroll = () => {
        if (window.pageYOffset > coords) {
            btnUp.classList.add ("btnUp_active");
        }
        if (window.pageYOffset < coords) {
            btnUp.classList.remove ("btnUp_active");
        }
    };

    btnUp.onclick = () => {
        scrolled = window.pageYOffset;
        // window.pageYOffset - метод глобального объекта window, кот. возвращает количество px с текущего места прокрутки по оси Y;
        scrollToTop(); // запуск функции по клику на кнопку
    };



    scrollToTop = () => {
        // если текущая координата больше 0, то от этой координаты отнимаю по 20px и устанавливаю таймер на запуск этой же функции через 10мс
        if (scrolled > 0) {
            window.scrollTo (0, scrolled);
            scrolled -= 20; // это к-во px, кот. определяют скорость прокрутки
            timer = setTimeout(scrollToTop, 10);

        // а если текущая координата больше 0, но не меньше 20px, на которые я прокручиваю, то докручиваю до 0 и очищаю таймер
        } else {
            window.scrollTo(0,0);
            clearTimeout(timer);
        }
    };
}


/******** scroll to anchors **********/

// собираю все якоря в коллекцию, и сразу преобразовываю ее в массив методом prototype
const anchors = [].slice.call(document.querySelectorAll("a[href*='#']"));
const animationTime = 300; // время анимации
const framesCount = 20; // количество кадров

// каждому якорю присваиваю обработчик события клика
anchors.forEach( item => {
    item.addEventListener("click", e => {
        e.preventDefault(); //убираю действие ссылок по умолчанию

        // для каждого якоря беру соответствующий ему элемент и определяю его координату Y
        let atr = item.getAttribute("href");
        
        let coordY = document.querySelector(atr).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        /*
        Метод Element.scrollIntoView(options) прокручивает текущий элемент в видимую область окна браузера.
        Aргумент типа object со следующим набором опций:
        {
            behavior: "auto"  | "instant" | "smooth",
            block:    "start" | "end",
        }
        */
    });
});


/************ slider 1 *************/

    let slideIndex = 1;
    showSlides(slideIndex);

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("theTeam__slider_slide1");
        let dots = document.getElementsByClassName("theTeam__slider_dot");

        for (i=0; i<slides.length; i++){
            slides[i].style.display = "none";
        }

        for (i=0; i<dots.length; i++){
            dots[i].className = dots[i].className.replace (" currentDot", "");
        }

        slides[slideIndex-1].style.display = "flex"; 
        dots[slideIndex-1].className += " currentDot";

    }

/************ end slider 1 *************/




/************ slider 2 *************/

    let indexOfSlide = 0;

    autoSlider();

    function autoSlider(n)  {
        let i;
        let slides = document.getElementsByClassName("card"); // html коллекция из блоков / слайдов
        let dots = document.getElementsByClassName("testi__slider_dot"); // html коллекция из точек
        // перебираю в цикле HTML коллекцию slides и назначаю каждому css свойство - display: none
        for (i=0; i<slides.length; i++){
            slides[i].style.display = "none";
        }
       
        indexOfSlide++;
        // перебираю в цикле HTML коллекцию dots, нахожу класс currentDot и заменяю его на пустую строку
        for (i=0; i<dots.length; i++){
            dots[i].className = dots[i].className.replace (" currentDot", "");
        }
        
        if (indexOfSlide > slides.length) {
            indexOfSlide = 1;
        }
        
        // присваиваю стиль элементу из HTML-коллекции с соответ. индексом (-1)
        slides[indexOfSlide-1].style.display = "flex";
        // присваиваю класс элементу коллекции с соответ. идексом (-1)
        dots[indexOfSlide-1].className += " currentDot";
       
        setTimeout(autoSlider, 4000);
    }

/************ end slider 2 *************/






/*********** google map *********************/

function initMap()  {
    var options = {
        center: { lat: 46.478747, lng: 30.723505 },
        zoom: 17
    };

    var map = new google.maps.Map(document.getElementById('map'), options);
}

/*********** end google map ******************/

/*
    function initMobile() {
        console.log("is-mobile");

    }

    function initDesktop() {
        console.log("is-desktop");
     }

    ssm.addState({
        id: 'tablet',
        query: '(max-width: 768px)',
        onEnter: function(){
            initMobile();
        }
    });

    ssm.addState({
        id: 'desktop',
        query: '(min-width: 768px)',
        onEnter: function(){
            initDesktop();
        }
    });
*/


