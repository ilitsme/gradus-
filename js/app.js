(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    class MousePRLX {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            if (this.config.init) {
                const paralaxMouse = document.querySelectorAll("[data-prlx-mouse]");
                if (paralaxMouse.length) {
                    this.paralaxMouseInit(paralaxMouse);
                    this.setLogging(`Прокинувся, стежу за об'єктами: (${paralaxMouse.length})`);
                } else this.setLogging("Немає жодного обєкта. Сплю...");
            }
        }
        paralaxMouseInit(paralaxMouse) {
            paralaxMouse.forEach((el => {
                const paralaxMouseWrapper = el.closest("[data-prlx-mouse-wrapper]");
                const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
                const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
                const directionX = el.hasAttribute("data-prlx-dxr") ? -1 : 1;
                const directionY = el.hasAttribute("data-prlx-dyr") ? -1 : 1;
                const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;
                let positionX = 0, positionY = 0;
                let coordXprocent = 0, coordYprocent = 0;
                setMouseParallaxStyle();
                if (paralaxMouseWrapper) mouseMoveParalax(paralaxMouseWrapper); else mouseMoveParalax();
                function setMouseParallaxStyle() {
                    const distX = coordXprocent - positionX;
                    const distY = coordYprocent - positionY;
                    positionX += distX * paramAnimation / 1e3;
                    positionY += distY * paramAnimation / 1e3;
                    el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0) rotate(0.02deg);`;
                    requestAnimationFrame(setMouseParallaxStyle);
                }
                function mouseMoveParalax(wrapper = window) {
                    wrapper.addEventListener("mousemove", (function(e) {
                        const offsetTop = el.getBoundingClientRect().top + window.scrollY;
                        if (offsetTop >= window.scrollY || offsetTop + el.offsetHeight >= window.scrollY) {
                            const parallaxWidth = window.innerWidth;
                            const parallaxHeight = window.innerHeight;
                            const coordX = e.clientX - parallaxWidth / 2;
                            const coordY = e.clientY - parallaxHeight / 2;
                            coordXprocent = coordX / parallaxWidth * 100;
                            coordYprocent = coordY / parallaxHeight * 100;
                        }
                    }));
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[PRLX Mouse]: ${message}`) : null;
        }
    }
    modules_flsModules.mousePrlx = new MousePRLX({});
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.observer;
            !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher");
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
        }
        scrollWatcherConstructor(items) {
            if (items.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`);
                let uniqParams = uniqArray(Array.from(items).map((function(item) {
                    return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })));
                uniqParams.forEach((uniqParam => {
                    let uniqParamArray = uniqParam.split("|");
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };
                    let groupItems = Array.from(items).filter((function(item) {
                        let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                        let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                        let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                        if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                    }));
                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    this.scrollWatcherInit(groupItems, configWatcher);
                }));
            } else this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz");
        }
        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};
            if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if (paramsWatch.root !== "null") this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`);
            configWatcher.rootMargin = paramsWatch.margin;
            if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`);
                return;
            }
            if (paramsWatch.threshold === "prx") {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
            } else paramsWatch.threshold = paramsWatch.threshold.split(",");
            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }
        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver(((entries, observer) => {
                entries.forEach((entry => {
                    this.scrollWatcherCallback(entry, observer);
                }));
            }), configWatcher);
        }
        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.forEach((item => this.observer.observe(item)));
        }
        scrollWatcherIntersecting(entry, targetElement) {
            if (entry.isIntersecting) {
                !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                this.scrollWatcherLogging(`Я бачу ${targetElement.classList}, додав клас _watcher-view`);
            } else {
                targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                this.scrollWatcherLogging(`Я не бачу ${targetElement.classList}, прибрав клас _watcher-view`);
            }
        }
        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
            this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
        }
        scrollWatcherLogging(message) {
            this.config.logging ? functions_FLS(`[Спостерігач]: ${message}`) : null;
        }
        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);
            targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
            document.dispatchEvent(new CustomEvent("watcherCallback", {
                detail: {
                    entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);
    function handleScroll() {
        const elements = document.querySelectorAll(".scroll-item");
        elements.forEach((element => {
            const rect = element.getBoundingClientRect();
            const centerY = window.innerHeight / 2;
            if (rect.top <= centerY && rect.bottom >= centerY) {
                const firstChild = element.querySelector(":first-child");
                if (firstChild) firstChild.classList.add("sub-title-stroke--red");
            } else {
                const firstChild = element.querySelector(":first-child");
                if (firstChild) firstChild.classList.remove("sub-title-stroke--red");
            }
        }));
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);
    const lenis = new Lenis;
    lenis.on("scroll", (e => {
        console.log(e);
    }));
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time => {
        lenis.raf(time * 1e3);
    }));
    gsap.ticker.lagSmoothing(0);
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1919px)", (() => {
        gsap.registerPlugin(ScrollTrigger);
        const tlFirst = gsap.timeline();
        tlFirst.from(".animation-item-left-tl", {
            x: -150,
            opacity: 0,
            duration: .6
        });
        tlFirst.from(".animation-item-right-tl", {
            x: 150,
            opacity: 0,
            duration: .6
        }, "-=0.6");
        tlFirst.from(".gradus__logo", {
            y: 500,
            opacity: 0,
            duration: 1
        });
        tlFirst.from(".slow-animation-item-left-tl", {
            x: -200,
            opacity: 0,
            duration: 1
        });
        tlFirst.from(".slow-animation-item-right-tl", {
            x: 200,
            opacity: 0,
            duration: 1
        }, "-=1");
        gsap.utils.toArray(".animation-item").forEach((e => {
            gsap.fromTo(e, {
                opacity: 0,
                y: 100
            }, {
                opacity: 1,
                y: 0,
                duration: .7,
                delay: .5,
                scrollTrigger: e
            });
        }));
        gsap.utils.toArray(".animation-item-left").forEach((e => {
            gsap.fromTo(e, {
                opacity: 0,
                x: -150
            }, {
                opacity: 1,
                x: 0,
                duration: 1,
                delay: .8,
                scrollTrigger: e
            });
        }));
        gsap.utils.toArray(".animation-item-right").forEach((e => {
            gsap.fromTo(e, {
                opacity: 0,
                x: 150
            }, {
                opacity: 1,
                x: 0,
                duration: .8,
                delay: .5,
                scrollTrigger: e
            });
        }));
        gsap.utils.toArray(".slow-animation-item-left").forEach((e => {
            gsap.fromTo(e, {
                opacity: 0,
                x: -150
            }, {
                opacity: 1,
                x: 0,
                duration: 1.5,
                delay: .5,
                scrollTrigger: e
            });
        }));
        gsap.utils.toArray(".slow-animation-item-right").forEach((e => {
            gsap.fromTo(e, {
                opacity: 0,
                x: 150
            }, {
                opacity: 1,
                x: 0,
                duration: 1.5,
                delay: .5,
                scrollTrigger: e
            });
        }));
        const tlTitle = gsap.timeline({
            scrollTrigger: {
                trigger: ".sticky-block",
                start: "top center",
                end: "bottom center",
                scrub: 1.4
            }
        });
        tlTitle.to(".sticky-block", {
            y: 200
        });
        gsap.fromTo(".first-text", {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            scrollTrigger: ".first-text",
            opacity: 1,
            delay: .5,
            duration: .7
        });
        gsap.fromTo(".second-text", {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            scrollTrigger: ".second-text",
            opacity: 1,
            delay: .5,
            duration: .7
        });
        gsap.fromTo(".body-digital__btn", {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            scrollTrigger: ".body-digital__btn",
            opacity: 1,
            delay: 1,
            duration: .7
        });
        gsap.to(".gsap-media--1", {
            y: 570,
            scrollTrigger: {
                trigger: ".item-anim-1",
                start: "bottom center",
                scrub: 1.2
            }
        });
        gsap.to(".gsap-media--2", {
            y: 440,
            scrollTrigger: {
                trigger: ".item-anim-2",
                start: "bottom center",
                scrub: 1.5
            }
        });
        gsap.to(".gsap-media--3", {
            y: 85,
            scrollTrigger: {
                trigger: ".item-anim-3",
                start: "bottom center",
                scrub: 1.5
            }
        });
    }));
    window["FLS"] = false;
    isWebp();
    menuInit();
})();