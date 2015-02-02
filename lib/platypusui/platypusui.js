var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var platui;
(function (platui) {
    var __prefix = '$', __Promise = __prefix + 'Promise', __Compat = __prefix + 'Compat', __Regex = __prefix + 'Regex', __Window = __prefix + 'Window', __Document = __prefix + 'Document', __Utils = __prefix + 'Utils', __Animator = __prefix + 'Animator', __DomEventInstance = __prefix + 'DomEventInstance', __CONTEXT = 'context', __Plat = 'plat-', __Button = __Plat + 'button', __Checkbox = __Plat + 'checkbox', __Drawer = __Plat + 'drawer', __DrawerController = __Plat + 'drawer-controller', __Modal = __Plat + 'modal', __ProgressBar = __Plat + 'progress', __ProgressRing = __Plat + 'ring', __Radio = __Plat + 'radio', __Toggle = __Plat + 'toggle', __Slider = __Plat + 'slider', __Range = __Plat + 'range', __Select = __Plat + 'select', __Input = __Plat + 'input', __Carousel = __Plat + 'carousel', __TemplateControlFactory = '$TemplateControlFactory', __Hide = __Plat + 'hide', __Checked = __Plat + 'checked', __CamelChecked = 'platChecked', __Context = __Plat + __CONTEXT, __CamelContext = 'platContext', __Bind = __Plat + 'bind', __Transition = __Plat + 'transition', __$tap = '$tap', __$touchstart = '$touchstart', __$touchend = '$touchend', __$swipe = '$swipe', __$track = '$track', __$trackend = '$trackend', __ButtonPrefix = '__plat-button-', __RadioPrefix = '__plat-radio-', __DrawerControllerInitEvent = '__platDrawerControllerInit', __DrawerControllerFetchEvent = '__platDrawerControllerFetch', __DrawerFoundEvent = '__platDrawerFound', __DrawerControllerDisposing = '__platDrawerControllerDisposing', __DrawerControllerDisposingFound = '__platDrawerControllerDisposingFound', __Reversed = '-reversed', __transitionNegate = {
        right: 'left',
        left: 'right',
        up: 'down',
        down: 'up'
    };
    if (typeof window !== 'undefined') {
        if (typeof window.platui === 'undefined') {
            window.platui = platui;
        }
        if (typeof window.module === 'undefined') {
            window.module = {};
        }
    }
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.apply(this, arguments);
            this.replaceWith = 'button';
            this.groupName = '';
            this._document = plat.acquire(__Document);
        }
        Button.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Button + ' ' + (className || ''));
        };
        Button.prototype.initialize = function () {
            this.setClasses();
        };
        Button.prototype.setTemplate = function () {
            var _document = this._document, element = this.element, childNodes = Array.prototype.slice.call(element.childNodes), childNode, span, match;
            if (childNodes.length === 0) {
                span = _document.createElement('span');
                element.insertBefore(span, null);
                return;
            }
            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = _document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                }
                else {
                    element.insertBefore(childNode, null);
                }
            }
        };
        Button.prototype.loaded = function () {
            var element = this.element, optionObj = this.options || {}, options = optionObj.value || {}, group = options.group;
            if (!group) {
                if (element.hasAttribute(__Bind)) {
                    this._addEventListeners(element.getAttribute(__Bind));
                }
                else if (element.hasAttribute('data-' + __Bind)) {
                    this._addEventListeners(element.getAttribute('data-' + __Bind));
                }
                return;
            }
            this._addEventListeners(group);
        };
        Button.prototype._addEventListeners = function (name) {
            var _this = this;
            var element = this.element, dom = this.dom;
            this.groupName = name;
            this._isSelected = false;
            this.addEventListener(element, __$tap, this._onTap, false);
            this.on(__ButtonPrefix + name, function () {
                if (_this._isSelected) {
                    dom.removeClass(element, 'plat-selected');
                    _this._isSelected = false;
                }
            });
        };
        Button.prototype._onTap = function () {
            if (this._isSelected) {
                return;
            }
            var element = this.element;
            this.dom.addClass(element, 'plat-selected');
            this.dispatchEvent(__ButtonPrefix + this.groupName, plat.events.EventManager.DIRECT);
            this._isSelected = true;
            this.propertyChanged(element.textContent);
        };
        return Button;
    })(plat.ui.BindablePropertyControl);
    platui.Button = Button;
    plat.register.control(__Button, Button);
    var Toggle = (function (_super) {
        __extends(Toggle, _super);
        function Toggle() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-toggle-container">\n' + '    <div class="plat-knob"></div>\n' + '</div>\n';
            this.isActive = false;
            this._utils = plat.acquire(__Utils);
            this._targetType = 'slide';
        }
        Toggle.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Toggle + ' ' + (className || ''));
        };
        Toggle.prototype.initialize = function () {
            this.setClasses();
        };
        Toggle.prototype.loaded = function () {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
        };
        Toggle.prototype.setProperty = function (newValue, oldValue, setProperty) {
            if (newValue === oldValue) {
                return;
            }
            var isActive = !!newValue;
            if (isActive === this.isActive) {
                return;
            }
            this._toggle(setProperty);
        };
        Toggle.prototype._onTap = function (ev) {
            this._toggle(true);
            this._trigger('change');
        };
        Toggle.prototype._trigger = function (event) {
            var domEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        };
        Toggle.prototype._toggle = function (setProperty) {
            var wasActive = this.isActive, isActive = !wasActive;
            this._activate(this._targetElement || (this._targetElement = this.element.firstElementChild));
            this.isActive = this.element.checked = isActive;
            if (setProperty === true) {
                this.propertyChanged(isActive, wasActive);
            }
        };
        Toggle.prototype._activate = function (element) {
            this.dom.toggleClass(element, __Plat + this._targetType);
        };
        return Toggle;
    })(plat.ui.BindablePropertyControl);
    platui.Toggle = Toggle;
    plat.register.control(__Toggle, Toggle);
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-checkbox-container">\n' + '    <span class="plat-mark"></span>\n' + '</div>\n';
            this._document = plat.acquire(__Document);
            this._targetTypeSet = false;
        }
        Checkbox.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Checkbox + ' ' + (className || ''));
        };
        Checkbox.prototype.setTemplate = function () {
            var isNull = this._utils.isNull, innerTemplate = this.innerTemplate;
            if (isNull(innerTemplate)) {
                return;
            }
            var _document = this._document, element = this.element, childNodes = Array.prototype.slice.call(innerTemplate.childNodes), childNode, span, match;
            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = _document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                }
                else {
                    element.insertBefore(childNode, null);
                }
            }
        };
        Checkbox.prototype.loaded = function () {
            _super.prototype.loaded.call(this);
            var optionObj = this.options || {}, options = optionObj.value || {}, previousType = this._targetType, mark = this._targetType = options.mark || 'check';
            this._convertChecked();
            switch (mark.toLowerCase()) {
                case 'check':
                case 'x':
                    break;
                default:
                    var _Exception = this._Exception;
                    _Exception.warn('Invalid mark option specified for' + this.type + '. Defaulting to checkmark.', _Exception.CONTROL);
                    this._targetType = 'check';
                    break;
            }
            if (this._targetTypeSet) {
                var target = this._targetElement;
                this.dom.removeClass(target, previousType);
                this._activate(target);
            }
            this._targetTypeSet = true;
        };
        Checkbox.prototype._convertChecked = function () {
            var element = this.element;
            if (element.hasAttribute(__Checked)) {
                this._convertAttribute(element.getAttribute(__Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
            }
            else if (element.hasAttribute('data-' + __Checked)) {
                this._convertAttribute(element.getAttribute('data-' + __Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
            }
            else if (element.hasAttribute('checked') || element.hasAttribute('data-checked')) {
                this._convertAttribute(true);
            }
        };
        Checkbox.prototype._convertAttribute = function (newValue, oldValue) {
            var _utils = this._utils;
            if (_utils.isBoolean(newValue)) {
                return this.setProperty(newValue, oldValue, true);
            }
            else if (!_utils.isString(newValue)) {
                return;
            }
            this.setProperty(newValue === 'true', oldValue === 'true', true);
        };
        Checkbox.prototype._activate = function (element) {
            if (this._targetTypeSet) {
                this.dom.toggleClass(element, __Plat + this._targetType);
                return;
            }
            this._targetTypeSet = true;
        };
        return Checkbox;
    })(Toggle);
    platui.Checkbox = Checkbox;
    plat.register.control(__Checkbox, Checkbox);
    var Radio = (function (_super) {
        __extends(Radio, _super);
        function Radio() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-radio-container">\n' + '    <div class="plat-mark"></div>\n' + '</div>\n';
            this.groupName = '';
            this._targetType = 'bullet';
            this._targetTypeSet = true;
        }
        Radio.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Radio + ' ' + (className || ''));
        };
        Radio.prototype.loaded = function () {
            var element = this.element;
            this._targetElement = element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
            if (element.hasAttribute('name')) {
                this.groupName = element.getAttribute('name');
            }
            else if (element.hasAttribute(__Bind)) {
                this.groupName = element.getAttribute(__Bind);
            }
            else if (element.hasAttribute('data-' + __Bind)) {
                this.groupName = element.getAttribute('data-' + __Bind);
            }
            this._convertChecked();
        };
        Radio.prototype.setProperty = function (newValue, oldValue, setProperty) {
            if (newValue === oldValue) {
                return;
            }
            var isChecked = newValue === this._getValue(), wasChecked = this.isActive;
            if (isChecked === wasChecked) {
                return;
            }
            this._toggle(setProperty);
        };
        Radio.prototype.propertyChanged = function (newValue, oldValue) {
            if (this.isActive) {
                _super.prototype.propertyChanged.call(this, this._getValue());
            }
        };
        Radio.prototype._onTap = function (ev) {
            if (this.isActive) {
                return;
            }
            _super.prototype._onTap.call(this, ev);
        };
        Radio.prototype._toggle = function (setProperty) {
            var _this = this;
            _super.prototype._toggle.call(this, setProperty);
            if (this._utils.isFunction(this._removeListener)) {
                this._removeListener();
                this._removeListener = null;
            }
            if (this.isActive) {
                var name = this.groupName;
                this.dispatchEvent(__RadioPrefix + name, plat.events.EventManager.DIRECT);
                var remover = this._removeListener = this.on(__RadioPrefix + name, function () {
                    _this._toggle();
                    remover();
                });
            }
        };
        Radio.prototype._convertAttribute = function (newValue, oldValue) {
            var _utils = this._utils;
            if (_utils.isBoolean(newValue)) {
                if (newValue) {
                    this.setProperty(this._getValue(), null, true);
                }
                return;
            }
            else if (!_utils.isString(newValue)) {
                return;
            }
            if (newValue === 'true') {
                this.setProperty(this._getValue(), null, true);
            }
        };
        Radio.prototype._getValue = function () {
            var element = this.element;
            return element.hasAttribute('value') ? element.getAttribute('value').trim() : element.textContent.trim();
        };
        return Radio;
    })(Checkbox);
    platui.Radio = Radio;
    plat.register.control(__Radio, Radio);
    var ProgressRing = (function (_super) {
        __extends(ProgressRing, _super);
        function ProgressRing() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-progress-container">\n' + '    <div class="plat-animated-ring"></div>\n' + '</div>\n';
        }
        ProgressRing.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __ProgressRing + ' ' + (className || ''));
        };
        ProgressRing.prototype.initialize = function () {
            this.setClasses();
        };
        return ProgressRing;
    })(plat.ui.TemplateControl);
    platui.ProgressRing = ProgressRing;
    plat.register.control(__ProgressRing, ProgressRing);
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-progress-container">\n' + '    <div class="plat-animated-bar"></div>\n' + '</div>\n';
            this._window = plat.acquire(__Window);
            this._utils = plat.acquire(__Utils);
            this._cloneAttempts = 0;
            this._maxCloneAttempts = 25;
        }
        ProgressBar.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __ProgressBar + ' ' + (className || ''));
        };
        ProgressBar.prototype.initialize = function () {
            this.setClasses();
        };
        ProgressBar.prototype.loaded = function () {
            var _this = this;
            var context = this.context, barElement = this._barElement = this.element.firstElementChild.firstElementChild, bar = this._barMax = barElement.parentElement.offsetWidth;
            if (!bar) {
                this._setOffsetWithClone('width');
            }
            if (!this._utils.isNumber(context) || context > 1 || context < 0) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1.', _Exception.CONTEXT);
                return;
            }
            this.addEventListener(this._window, 'resize', function () {
                var offset = _this._barMax = barElement.parentElement.offsetWidth;
                if (!offset) {
                    _this._setOffsetWithClone('width');
                }
            }, false);
            this.setProgress();
        };
        ProgressBar.prototype.contextChanged = function () {
            this.setProgress();
        };
        ProgressBar.prototype.setProgress = function (value) {
            var barValue = value || this.context;
            if (!this._utils.isNumber(barValue) || barValue > 1 || barValue < 0) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1.', _Exception.CONTEXT);
                return;
            }
            this._barElement.style.width = Math.ceil(this._barMax * barValue) + 'px';
        };
        ProgressBar.prototype._setOffsetWithClone = function (dependencyProperty) {
            var element = this.element, _document = plat.acquire(__Document), body = _document.body;
            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var _Exception = this._Exception, type = this.type;
                    _Exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' + 'DOM. Disposing of the ' + type + '.', _Exception.CONTROL);
                    plat.acquire(__TemplateControlFactory).dispose(this);
                    return;
                }
                this._utils.defer(this._setOffsetWithClone, 10, [dependencyProperty], this);
                return;
            }
            this._cloneAttempts = 0;
            var clone = element.cloneNode(true), regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, dependencyValue;
            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, 'important');
                element = element.parentElement;
                shallowCopy = element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(clone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._barMax = clone.firstElementChild.offsetWidth;
            body.removeChild(shallowCopy);
        };
        return ProgressBar;
    })(plat.ui.TemplateControl);
    platui.ProgressBar = ProgressBar;
    plat.register.control(__ProgressBar, ProgressBar);
    var Drawer = (function (_super) {
        __extends(Drawer, _super);
        function Drawer() {
            _super.apply(this, arguments);
            this._utils = plat.acquire(__Utils);
            this._Promise = plat.acquire(__Promise);
            this._controllers = [];
            this._loaded = false;
            this._preloadedValue = false;
        }
        Drawer.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Drawer + ' ' + (className || ''));
        };
        Drawer.prototype.initialize = function () {
            var childNodes = Array.prototype.slice.call(this.element.childNodes);
            if (childNodes.length > 0) {
                this.innerTemplate = this.dom.appendChildren(childNodes);
            }
            this.setClasses();
        };
        Drawer.prototype.loaded = function () {
            var _this = this;
            var element = this.element, _utils = this._utils, optionObj = this.options || {}, options = optionObj.value || {}, position = this._currentPosition = options.position || 'left', useContext = this._useContext = (options.useContext === true) || !_utils.isUndefined(this.attributes[__CamelContext]), id = options.id || '', templateUrl = options.templateUrl, isElastic = options.elastic === true;
            element.setAttribute(__Hide, '');
            this.dom.addClass(element, __Plat + position);
            if (_utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then(function (template) {
                    _this.innerTemplate = template;
                    if (_this._useContext) {
                        _this.bindTemplate('drawer', template.cloneNode(true));
                        _this._checkPreload();
                    }
                    _this._initializeEvents(id, position, isElastic);
                });
                return;
            }
            else if (useContext && _utils.isNode(this.innerTemplate)) {
                this.bindTemplate('drawer', this.innerTemplate.cloneNode(true));
                this._checkPreload();
            }
            this._initializeEvents(id, position, isElastic);
        };
        Drawer.prototype.open = function () {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' + this.type + ' attempting to open.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.open();
        };
        Drawer.prototype.close = function () {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' + this.type + ' attempting to close.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.close();
        };
        Drawer.prototype.toggle = function () {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' + this.type + ' attempting to toggle.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.toggle();
        };
        Drawer.prototype.reset = function () {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' + this.type + ' attempting to reset.', _Exception.TEMPLATE);
                return this._Promise.resolve(null);
            }
            return controller.reset();
        };
        Drawer.prototype.isOpen = function () {
            var controller = this._controllers[0];
            if (this._utils.isNull(controller)) {
                var _Exception = this._Exception;
                _Exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' + this.type + ' attempting to check if open.', _Exception.TEMPLATE);
                return false;
            }
            return controller.isOpen();
        };
        Drawer.prototype.bindTemplate = function (name, node) {
            var _this = this;
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            bindableTemplates.bind(name).then(function (template) {
                var element = _this.element;
                _this.dom.clearNode(element);
                element.appendChild(template);
            }).catch(function (error) {
                var _Exception = _this._Exception;
                _Exception.warn('Error binding template for ' + _this.type + ': ' + error, _Exception.BIND);
            });
        };
        Drawer.prototype.setProperty = function (newValue, oldValue) {
            if (!this.loaded) {
                this._preloadedValue = newValue;
                return;
            }
            var _utils = this._utils, controller = this._controllers[0];
            if (_utils.isBoolean(newValue) && !_utils.isNull(controller)) {
                if (newValue) {
                    if (controller.isOpen()) {
                        return;
                    }
                    controller.open();
                    return;
                }
                if (controller.isOpen()) {
                    controller.close();
                }
            }
        };
        Drawer.prototype.controllerCount = function () {
            return this._controllers.length;
        };
        Drawer.prototype.spliceController = function (controller) {
            var controllers = this._controllers, index = controllers.indexOf(controller);
            if (index === -1) {
                return;
            }
            controllers.splice(index, 1);
        };
        Drawer.prototype._changeDirection = function (position) {
            if (this._utils.isNull(position) || position === this._currentPosition) {
                return;
            }
            var dom = this.dom, element = this.element;
            dom.removeClass(element, __Plat + this._currentPosition);
            dom.addClass(element, __Plat + position);
            this._currentPosition = position;
        };
        Drawer.prototype._initializeEvents = function (id, position, isElastic) {
            var _this = this;
            var _utils = this._utils, isString = _utils.isString, isNull = _utils.isNull, innerTemplate = this.innerTemplate, useContext = this._useContext, DIRECT = plat.events.EventManager.DIRECT;
            this.on(__DrawerControllerFetchEvent + '_' + id, function (event, controllerArg) {
                var control = controllerArg.control;
                if (isNull(control)) {
                    return;
                }
                if (isString(controllerArg.position)) {
                    position = controllerArg.position;
                    _this._changeDirection(position);
                }
                _this._controllers.unshift(control);
                if (!controllerArg.received) {
                    _this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                        control: _this,
                        received: true,
                        position: position,
                        useContext: useContext,
                        template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                        elastic: isElastic
                    });
                }
            });
            this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                control: this,
                received: false,
                position: position,
                useContext: useContext,
                template: _utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                elastic: isElastic
            });
        };
        Drawer.prototype._checkPreload = function () {
            var _this = this;
            if (this._preloadedValue) {
                var _utils = this._utils;
                _utils.postpone(function () {
                    var controller = _this._controllers[0];
                    if (!_utils.isNull(controller)) {
                        controller.open();
                    }
                });
            }
        };
        return Drawer;
    })(plat.ui.BindablePropertyControl);
    platui.Drawer = Drawer;
    plat.register.control(__Drawer, Drawer);
    var DrawerController = (function (_super) {
        __extends(DrawerController, _super);
        function DrawerController() {
            _super.apply(this, arguments);
            this._utils = plat.acquire(__Utils);
            this._compat = plat.acquire(__Compat);
            this._window = plat.acquire(__Window);
            this._document = plat.acquire(__Document);
            this._animator = plat.acquire(__Animator);
            this._Promise = plat.acquire(__Promise);
            this._hasSwiped = false;
            this._hasTapped = false;
            this._isOpen = false;
            this._touchState = 0;
            this._disposeRemover = function () {
            };
            this._loaded = false;
            this._preloadedValue = false;
        }
        DrawerController.prototype.initialize = function () {
            this.dom.addClass(this.element, __DrawerController);
        };
        DrawerController.prototype.loaded = function () {
            var optionObj = this.options || {}, options = optionObj.value || {}, position = options.position, id = options.id || '';
            this._type = options.type || 'tap track';
            this._isElastic = options.elastic;
            this._useContext = options.useContext;
            this._templateUrl = options.templateUrl;
            this._initializeEvents(id, position);
        };
        DrawerController.prototype.dispose = function () {
            var _this = this;
            var _utils = this._utils, drawer = this._drawer;
            if (_utils.isNull(drawer)) {
                return;
            }
            drawer.spliceController(this);
            if (drawer.controllerCount() > 0) {
                return;
            }
            var storedStyle = drawer.storedProperties, rootElement = this._rootElement, disposeRootElement = true;
            this._disposeRemover();
            this.on(__DrawerControllerDisposingFound, function (ev, otherRoot) {
                if (!disposeRootElement) {
                    return;
                }
                disposeRootElement = rootElement !== otherRoot;
            });
            _utils.defer(function () {
                if (!disposeRootElement) {
                    return;
                }
                _this.dom.removeClass(rootElement, __Drawer + '-open plat-drawer-transition-prep ' + _this._directionalTransitionPrep);
                if (_utils.isObject(storedStyle)) {
                    var rootElementStyle = rootElement.style, parent = rootElement.parentElement;
                    rootElementStyle.position = storedStyle.position;
                    rootElementStyle.zIndex = storedStyle.zIndex;
                    if (_utils.isNode(parent)) {
                        parent.style.overflow = storedStyle.parentOverflow;
                    }
                }
            }, 25);
            this.dispatchEvent(__DrawerControllerDisposing, plat.events.EventManager.DIRECT);
        };
        DrawerController.prototype.open = function () {
            var _this = this;
            var wasClosed = !this._isOpen, _utils = this._utils;
            if (_utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }
            var promise = new this._Promise(function (resolve) {
                _this._toggleDelay = _utils.requestAnimationFrame(function () {
                    _this._touchState = 0;
                    _this._toggleDelay = null;
                    _this._open().then(resolve);
                });
            });
            if (wasClosed) {
                if (this._useContext) {
                    this.propertyChanged(true);
                }
                else if (!_utils.isNull(this._drawer)) {
                    this._drawer.propertyChanged(true);
                }
            }
            return promise;
        };
        DrawerController.prototype.close = function () {
            var _this = this;
            var wasOpen = this._isOpen, _utils = this._utils;
            if (_utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }
            var promise = new this._Promise(function (resolve) {
                _this._toggleDelay = _utils.requestAnimationFrame(function () {
                    _this._touchState = 0;
                    _this._toggleDelay = null;
                    _this._close().then(resolve);
                });
            });
            if (wasOpen) {
                if (this._useContext) {
                    this.propertyChanged(false);
                }
                else if (!_utils.isNull(this._drawer)) {
                    this._drawer.propertyChanged(false);
                }
            }
            return promise;
        };
        DrawerController.prototype.toggle = function () {
            if (this._isOpen) {
                return this.close();
            }
            return this.open();
        };
        DrawerController.prototype.reset = function () {
            if (this._isOpen) {
                return this.open();
            }
            return this.close();
        };
        DrawerController.prototype.isOpen = function () {
            return this._isOpen;
        };
        DrawerController.prototype.bindTemplate = function (name, node) {
            var _this = this;
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            bindableTemplates.bind(name).then(function (template) {
                var element = _this._drawerElement;
                _this.dom.clearNode(element);
                element.appendChild(template);
            }).catch(function (error) {
                var _Exception = _this._Exception;
                _Exception.warn('Error binding template for ' + _this.type + ': ' + error, _Exception.BIND);
            });
        };
        DrawerController.prototype.setProperty = function (newValue, oldValue) {
            var _this = this;
            if (!this.loaded) {
                this._preloadedValue = newValue;
                return;
            }
            var _utils = this._utils;
            if (_utils.isBoolean(newValue)) {
                if (newValue) {
                    if (this._isOpen) {
                        return;
                    }
                    this._toggleDelay = _utils.requestAnimationFrame(function () {
                        _this._touchState = 0;
                        _this._toggleDelay = null;
                        _this._open();
                    });
                    return;
                }
                if (this._isOpen) {
                    this._toggleDelay = _utils.requestAnimationFrame(function () {
                        _this._touchState = 0;
                        _this._toggleDelay = null;
                        _this._close();
                    });
                }
            }
        };
        DrawerController.prototype._open = function () {
            var _this = this;
            var rootElement = this._rootElement, drawerElement = this._drawerElement, _utils = this._utils, isNode = _utils.isNode, wasClosed = !this._isOpen;
            if (!(isNode(rootElement) && isNode(drawerElement))) {
                return this._Promise.resolve(null);
            }
            var translation;
            switch (this._position) {
                case 'left':
                    translation = 'translate3d(' + this._maxOffset + 'px,0,0)';
                    break;
                case 'right':
                    translation = 'translate3d(' + (-this._maxOffset) + 'px,0,0)';
                    break;
                case 'top':
                    translation = 'translate3d(0,' + this._maxOffset + 'px,0)';
                    break;
                case 'bottom':
                    translation = 'translate3d(0,' + (-this._maxOffset) + 'px,0)';
                    break;
                default:
                    return this._animator.resolve();
            }
            this._isOpen = true;
            drawerElement.removeAttribute(__Hide);
            if (wasClosed) {
                this.dom.addClass(rootElement, __Drawer + '-open ' + this._directionalTransitionPrep);
                this._addEventIntercepts();
            }
            else {
                this.dom.addClass(rootElement, this._directionalTransitionPrep);
            }
            var animationOptions = {};
            animationOptions[this._transform] = translation;
            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then(function () {
                _this._animationThenable = null;
            });
        };
        DrawerController.prototype._close = function () {
            var _this = this;
            var rootElement = this._rootElement, drawerElement = this._drawerElement, dom = this.dom, _utils = this._utils, isNode = _utils.isNode;
            if (this._isOpen) {
                this._removeEventIntercepts();
                dom.removeClass(rootElement, __Drawer + '-open');
            }
            this._isOpen = false;
            if (!(isNode(rootElement) && isNode(drawerElement))) {
                return this._Promise.resolve(null);
            }
            var animationOptions = {}, transform = this._transform;
            animationOptions[transform] = this._preTransform;
            return this._animationThenable = this._animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then(function () {
                _this._animationThenable = null;
                if (_this._isOpen) {
                    return;
                }
                drawerElement.setAttribute(__Hide, '');
                dom.removeClass(rootElement, _this._directionalTransitionPrep);
            });
        };
        DrawerController.prototype._addEventIntercepts = function () {
            if (this._isTap) {
                this._addTapClose();
            }
            if (this._isSwipe) {
                this._addSwipeClose();
            }
            if (this._isTrack) {
                var rootElement = this._rootElement;
                var touchStartRemover = this.addEventListener(rootElement, __$touchstart, this._touchStart, false), trackRemover = this.addEventListener(rootElement, __$track, this._track, false), touchEnd = this._touchEnd, trackEndRemover = this.addEventListener(rootElement, __$trackend, touchEnd, false), touchEndRemover = this.addEventListener(rootElement, __$touchend, touchEnd, false);
                this._openTrackRemover = function () {
                    touchStartRemover();
                    trackRemover();
                    trackEndRemover();
                    touchEndRemover();
                };
            }
        };
        DrawerController.prototype._removeEventIntercepts = function () {
            var isFunction = this._utils.isFunction;
            if (this._isTap && isFunction(this._openTapRemover)) {
                this._openTapRemover();
                this._openTapRemover = null;
            }
            if (this._isTrack && isFunction(this._openTrackRemover)) {
                this._openTrackRemover();
                this._openTrackRemover = null;
            }
            if (this._isSwipe && isFunction(this._openSwipeRemover)) {
                this._openSwipeRemover();
                this._openSwipeRemover = null;
            }
        };
        DrawerController.prototype._addSwipeOpen = function () {
            var _this = this;
            this._removeSwipeOpen = this.addEventListener(this.element, __$swipe + __transitionNegate[this._position], function () {
                _this._hasSwiped = true;
                _this.open();
            }, false);
        };
        DrawerController.prototype._addSwipeClose = function () {
            var _this = this;
            this._openSwipeRemover = this.addEventListener(this._rootElement, __$swipe + this._position, function () {
                _this._hasSwiped = true;
                _this.close();
            }, false);
        };
        DrawerController.prototype._addTapOpen = function () {
            var _this = this;
            this._removeTap = this.addEventListener(this.element, __$tap, function () {
                _this._hasTapped = true;
                _this.open();
            }, false);
        };
        DrawerController.prototype._addTapClose = function () {
            var _this = this;
            this._openTapRemover = this.addEventListener(this._rootElement, __$tap, function () {
                _this._hasTapped = true;
                _this.close();
            }, false);
        };
        DrawerController.prototype._addEventListeners = function (position) {
            var element = this.element, isNull = this._utils.isNull, types = this._type.split(' ');
            this._position = position;
            this.addEventListener(this._window, 'resize', this._setOffset, false);
            if (this._isTap = (types.indexOf('tap') !== -1)) {
                this._addTapOpen();
            }
            if (this._isSwipe = (types.indexOf('swipe') !== -1)) {
                this._addSwipeOpen();
            }
            if (this._isTrack = (types.indexOf('track') !== -1)) {
                var trackFn = this._track, trackDirection;
                switch (position) {
                    case 'left':
                    case 'right':
                        trackDirection = position;
                        break;
                    case 'top':
                        trackDirection = 'up';
                        break;
                    case 'bottom':
                        trackDirection = 'down';
                        break;
                    default:
                        var _Exception = this._Exception;
                        _Exception.warn('Incorrect position: "' + position + '" defined for the a control such as "' + __Drawer + '", or "' + this.type + '."', _Exception.CONTROL);
                        return;
                }
                this._removePrimaryTrack = this.addEventListener(element, __$track + __transitionNegate[trackDirection], trackFn, false);
                this._removeSecondaryTrack = this.addEventListener(element, __$track + trackDirection, trackFn, false);
                if (isNull(this._lastTouch)) {
                    var touchEnd = this._touchEnd;
                    this._lastTouch = { x: 0, y: 0 };
                    this.addEventListener(element, __$touchstart, this._touchStart, false);
                    this.addEventListener(element, __$touchend, touchEnd, false);
                    this.addEventListener(element, __$trackend, touchEnd, false);
                }
            }
        };
        DrawerController.prototype._removeEventListeners = function () {
            var isFunction = this._utils.isFunction;
            if (this._isTap && isFunction(this._removeTap)) {
                this._removeTap();
                this._removeTap = null;
            }
            if (this._isTrack) {
                if (isFunction(this._removePrimaryTrack)) {
                    this._removePrimaryTrack();
                    this._removePrimaryTrack = null;
                }
                if (isFunction(this._removeSecondaryTrack)) {
                    this._removeSecondaryTrack();
                    this._removeSecondaryTrack = null;
                }
            }
            if (this._isSwipe && isFunction(this._removeSwipeOpen)) {
                this._removeSwipeOpen();
                this._removeSwipeOpen = null;
            }
        };
        DrawerController.prototype._touchStart = function (ev) {
            var _this = this;
            if (this._touchState === 1) {
                return;
            }
            if (!this._utils.isNull(this._animationThenable)) {
                this._animationThenable.cancel().then(function () {
                    _this._animationThenable = null;
                    _this._initTouch(ev);
                });
            }
            this._initTouch(ev);
        };
        DrawerController.prototype._initTouch = function (ev) {
            this._touchState = 1;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
            if (this._isOpen) {
                return;
            }
            this._drawerElement.removeAttribute(__Hide);
            this.dom.addClass(this._rootElement, this._directionalTransitionPrep);
        };
        DrawerController.prototype._touchEnd = function (ev) {
            var noTouch = this._touchState !== 1, hasSwiped = this._hasSwiped, hasTapped = this._hasTapped;
            this._hasSwiped = this._hasTapped = false;
            if (hasTapped || noTouch || hasSwiped) {
                this._touchState = 0;
                return;
            }
            this._touchState = 2;
            var distanceMoved;
            switch (this._position) {
                case 'left':
                case 'right':
                    distanceMoved = ev.clientX - this._lastTouch.x;
                    break;
                case 'top':
                case 'bottom':
                    distanceMoved = ev.clientY - this._lastTouch.y;
                    break;
                default:
                    return;
            }
            if (this._isRightDirection(distanceMoved)) {
                if (Math.abs(distanceMoved) > Math.ceil(this._maxOffset / 2)) {
                    this.toggle();
                    return;
                }
                this.reset();
            }
            else if (this._isElastic) {
                if (Math.abs(distanceMoved) > 0) {
                    this.reset();
                }
            }
            else if (!this._isOpen) {
                this._drawerElement.setAttribute(__Hide, '');
                this.dom.removeClass(this._rootElement, this._directionalTransitionPrep);
            }
        };
        DrawerController.prototype._track = function (ev) {
            var _this = this;
            if (this._touchState === 0) {
                return;
            }
            this._utils.requestAnimationFrame(function () {
                _this._rootElement.style[_this._transform] = _this._calculateTranslation(ev);
            });
        };
        DrawerController.prototype._isRightDirection = function (distanceMoved) {
            switch (this._position) {
                case 'left':
                case 'top':
                    return this._isOpen ? distanceMoved < 0 : distanceMoved > 0;
                case 'right':
                case 'bottom':
                    return this._isOpen ? distanceMoved > 0 : distanceMoved < 0;
                default:
                    return false;
            }
        };
        DrawerController.prototype._calculateTranslation = function (ev) {
            var distanceMoved;
            switch (this._position) {
                case 'left':
                    distanceMoved = this._isOpen ? this._checkElasticity(this._maxOffset + ev.clientX - this._lastTouch.x) : this._checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'right':
                    distanceMoved = this._isOpen ? this._checkElasticity(this._maxOffset + this._lastTouch.x - ev.clientX) : this._checkElasticity(this._lastTouch.x - ev.clientX);
                    return 'translate3d(' + (-distanceMoved) + 'px,0,0)';
                case 'top':
                    distanceMoved = this._isOpen ? this._checkElasticity(this._maxOffset + ev.clientY - this._lastTouch.y) : this._checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'bottom':
                    distanceMoved = this._isOpen ? this._checkElasticity(this._maxOffset + this._lastTouch.y - ev.clientY) : this._checkElasticity(this._lastTouch.y - ev.clientY);
                    return 'translate3d(0,' + (-distanceMoved) + 'px,0)';
                default:
                    return this._preTransform;
            }
        };
        DrawerController.prototype._checkElasticity = function (distanceMoved) {
            if (this._isElastic) {
                return distanceMoved;
            }
            if (distanceMoved < 0) {
                distanceMoved = 0;
            }
            else if (distanceMoved > this._maxOffset) {
                distanceMoved = this._maxOffset;
            }
            return distanceMoved;
        };
        DrawerController.prototype._initializeEvents = function (id, position) {
            var _this = this;
            this._setTransform();
            var eventRemover = this.on(__DrawerFoundEvent + '_' + id, function (event, drawerArg) {
                eventRemover();
                var _utils = _this._utils, isString = _utils.isString, isUndefined = _utils.isUndefined, drawer = (_this._drawer = drawerArg.control) || {}, drawerElement = _this._drawerElement = drawer.element, useContext = _this._useContext;
                if (!isString(position)) {
                    if (isString(drawerArg.position)) {
                        position = drawerArg.position;
                    }
                    else {
                        var _Exception = _this._Exception;
                        _Exception.warn('"position" is incorrectly defined for a control such as "' + __Drawer + '" or "' + _this.type + '."' + ' Please ensure it is a string.', _Exception.CONTROL);
                        return;
                    }
                }
                if (!_this._controllerIsValid(position)) {
                    return;
                }
                _this._addEventListeners(position.toLowerCase());
                _this._setOffset();
                if (isUndefined(_this._isElastic)) {
                    _this._isElastic = drawerArg.elastic === true;
                }
                if (!drawerArg.received) {
                    _this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                        control: _this,
                        received: true,
                        position: position
                    });
                }
                if (useContext === false || (isUndefined(useContext) && drawerArg.useContext === true)) {
                    return;
                }
                _this._useContext = true;
                _this._determineTemplate(drawerArg.template);
                if (_this._preloadedValue) {
                    _this._toggleDelay = _utils.requestAnimationFrame(function () {
                        _this._touchState = 0;
                        _this._toggleDelay = null;
                        _this._open();
                    });
                }
            });
            this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                control: this,
                received: false,
                position: position
            });
        };
        DrawerController.prototype._determineTemplate = function (fragment) {
            var _this = this;
            var _utils = this._utils;
            if (_utils.isString(this._templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, this._templateUrl).then(function (template) {
                    _this.bindTemplate('drawer', template);
                });
            }
            else if (_utils.isNode(fragment)) {
                this.bindTemplate('drawer', fragment);
            }
        };
        DrawerController.prototype._setTransform = function () {
            var style = this.element.style, isUndefined = this._utils.isUndefined;
            if (!isUndefined(this._preTransform = style.transform)) {
                this._transform = 'transform';
                return;
            }
            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(this._preTransform = style[(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
            else if (!isUndefined(this._preTransform = style[(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
        };
        DrawerController.prototype._controllerIsValid = function (position) {
            var _this = this;
            var isNull = this._utils.isNull, _Exception;
            if (isNull(this._drawerElement)) {
                _Exception = this._Exception;
                _Exception.warn('Could not find a corresponding control such as "' + __Drawer + '" for this "' + this.type + '."', _Exception.CONTROL);
                return false;
            }
            var rootElement = this._rootElement = this._getRootElement();
            if (isNull(rootElement)) {
                _Exception = this._Exception;
                _Exception.warn('Cannot have a "' + this.type + '" in a hierarchy above the corresponding control such as "' + __Drawer + '."', _Exception.CONTROL);
                return false;
            }
            var dom = this.dom, transitionPrep = 'plat-drawer-transition-prep';
            if (!dom.hasClass(rootElement, transitionPrep)) {
                dom.addClass(rootElement, transitionPrep);
            }
            this._directionalTransitionPrep = 'plat-drawer-transition-' + position;
            this._disposeRemover = this.on(__DrawerControllerDisposing, function () {
                _this.dispatchEvent(__DrawerControllerDisposingFound, plat.events.EventManager.DIRECT, rootElement);
            });
            return true;
        };
        DrawerController.prototype._getRootElement = function () {
            var drawer = this._drawer, _utils = this._utils;
            if (!_utils.isNull(drawer.storedProperties)) {
                return drawer.storedProperties.parentEl;
            }
            var isNode = _utils.isNode, root = this.root, element = _utils.isObject(root) && isNode(root.element) ? root.element : this.element, drawerEl = this._drawerElement, parent;
            while (isNode(parent = element.parentElement) && !parent.contains(drawerEl)) {
                element = parent;
            }
            var _window = this._window, computedStyle = _window.getComputedStyle(element), style = element.style, position = computedStyle.position, zIndex = Number(computedStyle.zIndex), rootElementStyle = {
                parentEl: element
            };
            if (position === 'static') {
                rootElementStyle.position = style.position;
                style.position = 'relative';
            }
            if (!_utils.isNumber(zIndex) || zIndex < 1) {
                rootElementStyle.zIndex = style.zIndex;
                style.zIndex = '1';
            }
            if (isNode(parent)) {
                var parentStyle = parent.style;
                rootElementStyle.parentOverflow = parentStyle.overflow;
                parentStyle.overflow = 'hidden';
            }
            drawer.storedProperties = rootElementStyle;
            return element;
        };
        DrawerController.prototype._setOffset = function () {
            var drawerElement = this._drawerElement;
            drawerElement.removeAttribute(__Hide);
            switch (this._position) {
                case 'left':
                case 'right':
                    this._maxOffset = this._drawerElement.offsetWidth;
                    break;
                case 'top':
                case 'bottom':
                    this._maxOffset = this._drawerElement.offsetHeight;
                    break;
                default:
                    break;
            }
            drawerElement.setAttribute(__Hide, '');
        };
        return DrawerController;
    })(plat.ui.BindablePropertyControl);
    platui.DrawerController = DrawerController;
    plat.register.control(__DrawerController, DrawerController);
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-modal-container"></div>\n';
            this._utils = plat.acquire(__Utils);
            this._compat = plat.acquire(__Compat);
            this._isVisible = false;
            this._loaded = false;
            this._preloadedValue = false;
            this._transitionHash = {
                up: true,
                down: true,
                left: true,
                right: true,
                fade: true
            };
        }
        Modal.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Modal + ' ' + __Hide + ' ' + (className || ''));
        };
        Modal.prototype.initialize = function () {
            var optionObj = this.options || {}, options = optionObj.value || {};
            this.templateUrl = options.templateUrl;
            this.setClasses();
        };
        Modal.prototype.setTemplate = function () {
            var _utils = this._utils, modalContainer;
            if (_utils.isString(this.templateUrl)) {
                var fragment = this.dom.serializeHtml(this.templateString), element = this.element, childNodes = Array.prototype.slice.call(element.childNodes);
                modalContainer = this._modalElement = fragment.firstChild;
                while (childNodes.length > 0) {
                    modalContainer.appendChild(childNodes.shift());
                }
                element.appendChild(fragment);
                return;
            }
            modalContainer = this._modalElement = this.element.firstElementChild;
            var innerTemplate = this.innerTemplate;
            if (_utils.isNode(innerTemplate)) {
                modalContainer.appendChild(innerTemplate);
            }
        };
        Modal.prototype.loaded = function () {
            var _this = this;
            var optionObj = this.options || {}, options = optionObj.value || {}, transition = options.transition;
            this._modalElement = this._modalElement || this.element.firstElementChild;
            this._loaded = true;
            if (!this._utils.isString(transition) || transition === 'none') {
                this.dom.addClass(this._modalElement, __Plat + 'no-transition');
                if (this._preloadedValue) {
                    this._utils.postpone(function () {
                        _this._show();
                    });
                }
                return;
            }
            else if (!this._transitionHash[transition]) {
                var _Exception = this._Exception;
                _Exception.warn('Custom transition: "' + transition + '" defined for "' + this.type + '." Please ensure the transition is defined to avoid errors.', _Exception.CONTROL);
            }
            this._transitionEnd = this._compat.animationEvents.$transitionEnd;
            this.dom.addClass(this._modalElement, __Plat + transition + ' ' + __Plat + 'modal-transition');
            if (this._preloadedValue) {
                this._utils.postpone(function () {
                    _this._show();
                });
            }
        };
        Modal.prototype.show = function () {
            var wasHidden = !this._isVisible;
            this._show();
            if (wasHidden) {
                this.propertyChanged(true);
            }
        };
        Modal.prototype.hide = function () {
            var wasVisible = this.isVisible;
            this._hide();
            if (wasVisible) {
                this.propertyChanged(false);
            }
        };
        Modal.prototype.toggle = function () {
            if (this._isVisible) {
                this.hide();
                return;
            }
            this.show();
        };
        Modal.prototype.isVisible = function () {
            return this._isVisible;
        };
        Modal.prototype.setProperty = function (newValue, oldValue) {
            if (!this._loaded) {
                this._preloadedValue = newValue;
                return;
            }
            if (this._utils.isBoolean(newValue)) {
                if (newValue) {
                    if (this._isVisible) {
                        return;
                    }
                    this._show();
                    return;
                }
                if (this._isVisible) {
                    this._hide();
                }
            }
        };
        Modal.prototype._show = function () {
            var _this = this;
            var dom = this.dom;
            dom.removeClass(this.element, __Hide);
            this._utils.defer(function () {
                dom.addClass(_this._modalElement, __Plat + 'activate');
            }, 25);
            this._isVisible = true;
        };
        Modal.prototype._hide = function () {
            var dom = this.dom;
            if (this._utils.isString(this._transitionEnd)) {
                this._addHideOnTransitionEnd();
            }
            else {
                dom.addClass(this.element, __Hide);
            }
            dom.removeClass(this._modalElement, __Plat + 'activate');
            this._isVisible = false;
        };
        Modal.prototype._addHideOnTransitionEnd = function () {
            var _this = this;
            var element = this.element, remove = this.addEventListener(element, this._transitionEnd, function () {
                remove();
                _this.dom.addClass(element, __Hide);
            }, false);
        };
        return Modal;
    })(plat.ui.BindablePropertyControl);
    platui.Modal = Modal;
    plat.register.control(__Modal, Modal);
    var Slider = (function (_super) {
        __extends(Slider, _super);
        function Slider() {
            _super.apply(this, arguments);
            this._window = plat.acquire(__Window);
            this._document = plat.acquire(__Document);
            this._utils = plat.acquire(__Utils);
            this._animator = plat.acquire(__Animator);
            this.templateString = '<div class="plat-slider-container">\n' + '    <div class="plat-slider-track">\n' + '        <div class="plat-knob"></div>\n' + '    </div>\n' + '</div>\n';
            this._knobOffset = 0;
            this._loaded = false;
            this._touchState = 0;
            this._cloneAttempts = 0;
            this._maxCloneAttempts = 25;
        }
        Slider.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Slider + ' ' + (className || ''));
        };
        Slider.prototype.initialize = function () {
            this.setClasses();
        };
        Slider.prototype.loaded = function () {
            var element = this.element, slider = this._slider = element.firstElementChild.firstElementChild, isNumber = this._utils.isNumber, optionObj = this.options || {}, options = optionObj.value || {}, optionValue = Number(options.value), optionMin = options.min, optionMax = options.max, step = options.step, reversed = this._reversed = (options.reverse === true), orientation = this._orientation = options.orientation || 'horizontal', bindValue = this.value, min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0, max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100, value = isNumber(optionValue) ? optionValue : isNumber(bindValue) ? bindValue : min, className = __Plat + orientation;
            this._knob = slider.firstElementChild;
            if (reversed) {
                className += __Reversed;
            }
            this.dom.addClass(element, className);
            this.value = min;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;
            if (min >= max) {
                var _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" min is greater than or equal to its max. Setting max to min + 1.', _Exception.CONTROL);
                this.max = min + 1;
            }
            this._setLength();
            this._setIncrement();
            this._initializeEvents(orientation);
            this.setValue(value);
            this._loaded = true;
        };
        Slider.prototype.setProperty = function (newValue, oldValue) {
            if (!this._utils.isNumber(newValue)) {
                newValue = this.min;
            }
            if (this._loaded) {
                if (this._touchState === 1) {
                    var _Exception = this._Exception;
                    _Exception.warn('Cannot set value of ' + this.type + ' while the user is modifying the value.', _Exception.CONTROL);
                    return;
                }
                this._setValue(newValue, true, false);
                return;
            }
            this.value = newValue;
        };
        Slider.prototype.setValue = function (value) {
            if (!this._utils.isNumber(value)) {
                return;
            }
            else if (this._touchState === 1) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set value of ' + this.type + ' while the user is modifying the value.', _Exception.CONTROL);
                return;
            }
            this._setValue(value, true, true);
        };
        Slider.prototype._initializeEvents = function (orientation) {
            var _this = this;
            var element = this.element, trackFn = this._track, touchEnd = this._touchEnd, track, reverseTrack;
            switch (orientation) {
                case 'horizontal':
                    track = __$track + 'right';
                    reverseTrack = __$track + 'left';
                    break;
                case 'vertical':
                    track = __$track + 'down';
                    reverseTrack = __$track + 'up';
                    break;
                default:
                    return;
            }
            this.addEventListener(element, __$touchstart, this._touchStart, false);
            this.addEventListener(element, track, trackFn, false);
            this.addEventListener(element, reverseTrack, trackFn, false);
            this.addEventListener(element, __$touchend, touchEnd, false);
            this.addEventListener(element, __$trackend, touchEnd, false);
            this.addEventListener(this._window, 'resize', function () {
                _this._setLength();
                _this._setIncrement();
                _this._setKnob();
            }, false);
        };
        Slider.prototype._touchStart = function (ev) {
            var _this = this;
            if (this._touchState === 1) {
                return;
            }
            this._touchState = 1;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY,
                value: this.value
            };
            var target = ev.target;
            if (target === this._knob) {
                return;
            }
            var offset;
            switch (this._orientation) {
                case 'horizontal':
                    if (target === this.element) {
                        offset = this._reversed ? this._maxOffset - (ev.offsetX - this._sliderOffset) : ev.offsetX - this._sliderOffset;
                    }
                    else if (target === this._slider) {
                        offset = this._reversed ? this._knobOffset - ev.offsetX : ev.offsetX;
                    }
                    else {
                        offset = this._reversed ? this._maxOffset - ev.offsetX : ev.offsetX;
                    }
                    break;
                case 'vertical':
                    if (target === this.element) {
                        offset = this._reversed ? ev.offsetY - this._sliderOffset : this._maxOffset - (ev.offsetY - this._sliderOffset);
                    }
                    else if (target === this._slider) {
                        offset = this._reversed ? ev.offsetY : this._knobOffset - ev.offsetY;
                    }
                    else {
                        offset = this._reversed ? ev.offsetY : this._maxOffset - ev.offsetY;
                    }
                    break;
                default:
                    return;
            }
            this._utils.requestAnimationFrame(function () {
                _this._knobOffset = _this._setSliderProperties(offset);
            });
        };
        Slider.prototype._touchEnd = function (ev) {
            var _this = this;
            if (this._touchState !== 1) {
                this._touchState = 0;
                return;
            }
            this._touchState = 2;
            var newOffset = this._calculateOffset(ev), maxOffset = this._maxOffset;
            this._utils.requestAnimationFrame(function () {
                _this._touchState = 0;
                if (_this._lastTouch.value !== _this.value) {
                    _this._trigger('change');
                }
                if (newOffset < 0) {
                    _this._knobOffset = 0;
                    return;
                }
                else if (newOffset > maxOffset) {
                    _this._knobOffset = maxOffset;
                    return;
                }
                _this._knobOffset = newOffset;
            });
        };
        Slider.prototype._track = function (ev) {
            var _this = this;
            if (this._touchState === 0) {
                return;
            }
            this._utils.requestAnimationFrame(function () {
                _this._setSliderProperties(_this._calculateOffset(ev));
            });
        };
        Slider.prototype._setSliderProperties = function (position) {
            var maxOffset = this._maxOffset, value;
            if (position <= 0) {
                value = this.min;
                if (value - this.value >= 0) {
                    return;
                }
                position = 0;
            }
            else if (position >= maxOffset) {
                value = this.max;
                if (value - this.value <= 0) {
                    return;
                }
                position = maxOffset;
            }
            else {
                value = this._calculateValue(position);
            }
            this._setValue(value, false, true);
            this._slider.style[this._lengthProperty] = position + 'px';
            return position;
        };
        Slider.prototype._calculateValue = function (width) {
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
        };
        Slider.prototype._calculateKnobPosition = function (value) {
            return (value - this.min) * this._increment;
        };
        Slider.prototype._calculateOffset = function (ev) {
            switch (this._orientation) {
                case 'horizontal':
                    return this._reversed ? (this._knobOffset + this._lastTouch.x - ev.clientX) : (this._knobOffset + ev.clientX - this._lastTouch.x);
                case 'vertical':
                    return this._reversed ? (this._knobOffset + ev.clientY - this._lastTouch.y) : (this._knobOffset + this._lastTouch.y - ev.clientY);
                default:
                    return 0;
            }
        };
        Slider.prototype._setLength = function (element) {
            var isNode = this._utils.isNode(element), el = isNode ? element : this._slider.parentElement;
            switch (this._orientation) {
                case 'horizontal':
                    this._lengthProperty = 'width';
                    this._maxOffset = el.offsetWidth;
                    this._sliderOffset = el.offsetLeft;
                    break;
                case 'vertical':
                    this._lengthProperty = 'height';
                    this._maxOffset = el.offsetHeight;
                    this._sliderOffset = el.offsetTop;
                    break;
                default:
                    var _Exception = this._Exception;
                    _Exception.warn('Invalid orientation "' + this._orientation + '" for "' + this.type + '."', _Exception.CONTROL);
                    return;
            }
            if (!(isNode || this._maxOffset)) {
                this._setOffsetWithClone(this._lengthProperty);
            }
        };
        Slider.prototype._setIncrement = function () {
            return (this._increment = this._maxOffset / (this.max - this.min));
        };
        Slider.prototype._setValue = function (newValue, setKnob, propertyChanged) {
            var value = this.value;
            if (newValue === value) {
                return;
            }
            else if (newValue >= this.max) {
                newValue = this.max;
            }
            else if (newValue <= this.min) {
                newValue = this.min;
            }
            else if (Math.abs(newValue - value) < this._step) {
                return;
            }
            this.value = this.element.value = newValue;
            if (setKnob) {
                this._setKnob();
            }
            if (propertyChanged) {
                this.propertyChanged(newValue, value);
            }
            this._trigger('input');
        };
        Slider.prototype._setKnob = function (value) {
            var animationOptions = {}, length = this._calculateKnobPosition((value || this.value));
            if (length === this._knobOffset) {
                return;
            }
            animationOptions[this._lengthProperty] = length + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._knobOffset = length;
        };
        Slider.prototype._trigger = function (event) {
            var domEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        };
        Slider.prototype._setOffsetWithClone = function (dependencyProperty) {
            var element = this.element, body = this._document.body;
            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var _Exception = this._Exception, type = this.type;
                    _Exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' + 'DOM. Disposing of the ' + type + '.', _Exception.CONTROL);
                    plat.acquire(__TemplateControlFactory).dispose(this);
                    return;
                }
                this._utils.defer(this._setOffsetWithClone, 10, [dependencyProperty], this);
                return;
            }
            this._cloneAttempts = 0;
            var clone = element.cloneNode(true), regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, dependencyValue;
            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, 'important');
                element = element.parentElement;
                shallowCopy = element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(clone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._setLength(clone.firstElementChild);
            body.removeChild(shallowCopy);
        };
        return Slider;
    })(plat.ui.BindablePropertyControl);
    platui.Slider = Slider;
    plat.register.control(__Slider, Slider);
    var Range = (function (_super) {
        __extends(Range, _super);
        function Range() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-range-container">\n' + '    <div class="plat-range-track">\n' + '        <div class="plat-lower-knob"></div>\n' + '        <div class="plat-upper-knob"></div>\n' + '    </div>\n' + '</div>\n';
            this._window = plat.acquire(__Window);
            this._document = plat.acquire(__Document);
            this._utils = plat.acquire(__Utils);
            this._animator = plat.acquire(__Animator);
            this._isSelf = false;
            this._touchState = 0;
            this._cloneAttempts = 0;
            this._maxCloneAttempts = 25;
        }
        Range.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Range + ' ' + (className || ''));
        };
        Range.prototype.contextChanged = function () {
            var context = this.context, _utils = this._utils;
            if (!_utils.isObject(context)) {
                var _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" context should be an object that implements the platui.IRangeContext interface.', _Exception.CONTEXT);
                return;
            }
            var lower = context.lower, upper = context.upper, isNumber = _utils.isNumber;
            this.setLower(isNumber(lower) ? lower : 0);
            this.setUpper(isNumber(upper) ? upper : this.max);
        };
        Range.prototype.initialize = function () {
            this.setClasses();
        };
        Range.prototype.loaded = function () {
            var context = this.context || {}, element = this.element, slider = this._slider = element.firstElementChild.firstElementChild, _utils = this._utils, isNumber = _utils.isNumber, optionObj = this.options || {}, options = optionObj.value || {}, optionLower = Number(options.lower), optionUpper = Number(options.upper), optionMin = options.min, optionMax = options.max, step = options.step, orientation = this._orientation = options.orientation || 'horizontal', reversed = this._reversed = (options.reverse === true), contextLower = context.lower, contextUpper = context.upper, min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0, max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100, lower = isNumber(contextLower) ? contextLower : isNumber(optionLower) ? optionLower : min, upper = isNumber(contextUpper) ? contextUpper : isNumber(optionUpper) ? optionUpper : max, className = __Plat + orientation, _Exception;
            this._lowerKnob = slider.firstElementChild;
            this._upperKnob = slider.lastElementChild;
            if (reversed) {
                var lowerKnob = this._lowerKnob;
                this._lowerKnob = this._upperKnob;
                this._upperKnob = lowerKnob;
                className += __Reversed;
            }
            this.dom.addClass(element, className);
            this.lower = min;
            this.upper = max;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;
            if (min >= max) {
                _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" min is greater than or equal to its max. Setting max to min + 1.', _Exception.CONTROL);
                this.max = min + 1;
            }
            this._setPositionAndLength();
            this._setIncrement();
            this._setLowerKnob(min);
            this._initializeEvents(orientation);
            if (!_utils.isObject(this.context)) {
                _Exception = this._Exception;
                _Exception.warn('"' + this.type + '\'s" context should be an object that implements the platui.IRangeContext interface.', _Exception.CONTROL);
                return;
            }
            this.setLower(lower);
            this.setUpper(upper);
            this._watchContext();
        };
        Range.prototype.setLower = function (value) {
            var _utils = this._utils, isNumber = _utils.isNumber;
            if (!_utils.isObject(this.context)) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set the lower value of a "' + this.type + '" whose context has ' + 'not yet been set to an object.', _Exception.CONTROL);
                return;
            }
            else if (!isNumber(value)) {
                var numberVal = Number(value);
                if (isNumber(numberVal)) {
                    value = numberVal;
                }
                else {
                    return;
                }
            }
            else if (this._touchState === 2) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set value of ' + this.type + '\'s lower knob while the user is modifying the value.', _Exception.CONTROL);
                return;
            }
            this._setLower(value, true);
        };
        Range.prototype.setUpper = function (value) {
            var _utils = this._utils, isNumber = _utils.isNumber;
            if (!_utils.isObject(this.context)) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set the upper value of a "' + this.type + '" whose context has ' + 'not yet been set to an object.', _Exception.CONTROL);
                return;
            }
            else if (!isNumber(value)) {
                var numberVal = Number(value);
                if (isNumber(numberVal)) {
                    value = numberVal;
                }
                else {
                    return;
                }
            }
            else if (this._touchState === 3) {
                var _Exception = this._Exception;
                _Exception.warn('Cannot set value of ' + this.type + '\'s upper knob while the user is modifying the value.', _Exception.CONTROL);
                return;
            }
            this._setUpper(value, true);
        };
        Range.prototype._watchContext = function () {
            var _this = this;
            var context = this.context;
            this.observe(context, 'lower', function (newValue, oldValue) {
                if (_this._isSelf || newValue === oldValue) {
                    return;
                }
                else if (_this._touchState === 2) {
                    var _Exception = _this._Exception;
                    _Exception.warn('Cannot set value of ' + _this.type + ' while the user is modifying the value.', _Exception.CONTROL);
                    return;
                }
                _this.setLower(newValue);
            });
            this.observe(context, 'upper', function (newValue, oldValue) {
                if (_this._isSelf || newValue === oldValue) {
                    return;
                }
                else if (_this._touchState === 3) {
                    var _Exception = _this._Exception;
                    _Exception.warn('Cannot set value of ' + _this.type + ' while the user is modifying the value.', _Exception.CONTROL);
                    return;
                }
                _this.setUpper(newValue);
            });
        };
        Range.prototype._initializeEvents = function (orientation) {
            var _this = this;
            var lowerKnob = this._lowerKnob, upperKnob = this._upperKnob, touchstart = this._touchStart, touchEnd = this._touchEnd, trackLower = this._trackLower, trackUpper = this._trackUpper, track, reverseTrack;
            switch (orientation) {
                case 'horizontal':
                    track = __$track + 'right';
                    reverseTrack = __$track + 'left';
                    break;
                case 'vertical':
                    track = __$track + 'down';
                    reverseTrack = __$track + 'up';
                    break;
                default:
                    return;
            }
            this.addEventListener(lowerKnob, __$touchstart, touchstart, false);
            this.addEventListener(upperKnob, __$touchstart, touchstart, false);
            this.addEventListener(lowerKnob, track, trackLower, false);
            this.addEventListener(lowerKnob, reverseTrack, trackLower, false);
            this.addEventListener(upperKnob, track, trackUpper, false);
            this.addEventListener(upperKnob, reverseTrack, trackUpper, false);
            this.addEventListener(lowerKnob, __$touchend, touchEnd, false);
            this.addEventListener(upperKnob, __$touchend, touchEnd, false);
            this.addEventListener(lowerKnob, __$trackend, touchEnd, false);
            this.addEventListener(upperKnob, __$trackend, touchEnd, false);
            this.addEventListener(this._window, 'resize', function () {
                _this._setPositionAndLength();
                _this._setIncrement();
                _this._setLowerKnob();
                _this._setUpperKnob();
            }, false);
        };
        Range.prototype._touchStart = function (ev) {
            var touchState = this._touchState;
            if (touchState === 1 || touchState === 2 || touchState === 3) {
                return;
            }
            this._touchState = 1;
            var target = ev.currentTarget, lastTouch = this._lastTouch;
            if (!this._utils.isNull(lastTouch)) {
                if (lastTouch.target !== target) {
                    lastTouch.target.style.zIndex = '0';
                    target.style.zIndex = '1';
                }
            }
            else {
                target.style.zIndex = '1';
            }
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY,
                value: target === this._lowerKnob ? this.lower : this.upper,
                target: target
            };
        };
        Range.prototype._touchEnd = function (ev) {
            var _this = this;
            var touchState = this._touchState;
            if (touchState === 0 || touchState === 4) {
                this._touchState = 0;
                return;
            }
            this._touchState = 4;
            var lastTouch = this._lastTouch, target = ev.currentTarget;
            if (this._utils.isNull(lastTouch) || (lastTouch.target !== target)) {
                return;
            }
            this._utils.requestAnimationFrame(function () {
                _this._touchState = 0;
                var isLower = target === _this._lowerKnob, newOffset = _this._calculateOffset(ev, isLower);
                if (isLower) {
                    if (lastTouch.value !== _this.lower) {
                        _this._trigger('change');
                    }
                }
                else if (lastTouch.value !== _this.upper) {
                    _this._trigger('change');
                }
                _this._setOffset(newOffset, isLower);
            });
        };
        Range.prototype._setOffset = function (offset, isLower) {
            var maxOffset = this._maxOffset;
            if (offset < 0) {
                return isLower ? (this._lowerKnobOffset = 0) : (this._upperKnobOffset = 0);
            }
            else if (offset > maxOffset) {
                return isLower ? (this._lowerKnobOffset = maxOffset) : (this._upperKnobOffset = maxOffset);
            }
            return isLower ? (this._lowerKnobOffset = offset) : (this._upperKnobOffset = offset);
        };
        Range.prototype._trackLower = function (ev) {
            var touchState = this._touchState;
            if (touchState !== 2) {
                if (touchState === 1) {
                    this._touchState = 2;
                }
                else if (touchState === 0 || touchState === 3) {
                    return;
                }
            }
            var maxOffset = this._maxOffset, position = this._calculateOffset(ev, true), value;
            if (position <= 0) {
                value = this.min;
                if (value - this.lower >= 0) {
                    value = null;
                }
                position = 0;
            }
            else if (position >= maxOffset) {
                value = this.max;
                if (value - this.lower <= 0) {
                    value = null;
                }
                position = maxOffset;
            }
            else {
                value = this._calculateValue(position);
                if (value - this.lower === 0) {
                    value = null;
                }
            }
            if (position > this._upperKnobOffset) {
                this._positionTogether(position, value);
                this._setOffset(position, false);
                return;
            }
            this._positionLower(position, value);
        };
        Range.prototype._trackUpper = function (ev) {
            var touchState = this._touchState;
            if (touchState !== 3) {
                if (touchState === 1) {
                    this._touchState = 3;
                }
                else if (touchState === 0 || touchState === 2) {
                    return;
                }
            }
            var maxOffset = this._maxOffset, position = this._calculateOffset(ev, false), value;
            if (position <= 0) {
                value = this.min;
                if (value - this.upper >= 0) {
                    value = null;
                }
                position = 0;
            }
            else if (position >= maxOffset) {
                value = this.max;
                if (value - this.upper <= 0) {
                    value = null;
                }
                position = maxOffset;
            }
            else {
                value = this._calculateValue(position);
                if (value - this.upper === 0) {
                    value = null;
                }
            }
            if (position < this._lowerKnobOffset) {
                this._positionTogether(position, value);
                this._setOffset(position, true);
                return;
            }
            this._positionUpper(position, value);
        };
        Range.prototype._positionLower = function (position, value) {
            var _this = this;
            this._utils.requestAnimationFrame(function () {
                var style = _this._slider.style;
                style[_this._positionProperty] = position + 'px';
                style[_this._lengthProperty] = (_this._upperKnobOffset - position) + 'px';
                if (value === null) {
                    return;
                }
                _this._setLower(value, false);
            });
        };
        Range.prototype._positionUpper = function (position, value) {
            var _this = this;
            this._utils.requestAnimationFrame(function () {
                _this._slider.style[_this._lengthProperty] = (position - _this._lowerKnobOffset) + 'px';
                if (value === null) {
                    return;
                }
                _this._setUpper(value, false);
            });
        };
        Range.prototype._positionTogether = function (position, value) {
            var _this = this;
            this._utils.requestAnimationFrame(function () {
                var style = _this._slider.style;
                style[_this._positionProperty] = position + 'px';
                style[_this._lengthProperty] = '0px';
                if (value === null) {
                    return;
                }
                _this._setLower(value, false, false);
                _this._setUpper(value, false);
            });
        };
        Range.prototype._calculateValue = function (width) {
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
        };
        Range.prototype._calculateOffset = function (ev, isLower) {
            var currentOffset = isLower ? this._lowerKnobOffset : this._upperKnobOffset, displacement;
            if (this._orientation === 'vertical') {
                displacement = this._reversed ? ev.clientY - this._lastTouch.y : this._lastTouch.y - ev.clientY;
            }
            else {
                displacement = this._reversed ? this._lastTouch.x - ev.clientX : ev.clientX - this._lastTouch.x;
            }
            return currentOffset + displacement;
        };
        Range.prototype._calculateKnobPosition = function (value) {
            return (value - this.min) * this._increment;
        };
        Range.prototype._setLower = function (newValue, setKnob, trigger) {
            var lower = this.lower, context = this.context || {};
            if (newValue === lower) {
                if (context.lower !== lower) {
                    this._isSelf = true;
                    context.lower = lower;
                    this._isSelf = false;
                }
                return;
            }
            else if (newValue >= this.max) {
                newValue = this.max;
            }
            else if (newValue <= this.min) {
                newValue = this.min;
            }
            else if (Math.abs(newValue - lower) < this._step) {
                return;
            }
            this._isSelf = true;
            this.lower = context.lower = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setLowerKnob();
            }
            if (trigger === false) {
                return;
            }
            this._trigger('input');
        };
        Range.prototype._setUpper = function (newValue, setKnob, trigger) {
            var upper = this.upper, context = this.context || {};
            if (newValue === upper) {
                if (context.upper !== upper) {
                    this._isSelf = true;
                    context.upper = upper;
                    this._isSelf = false;
                }
                return;
            }
            else if (newValue >= this.max) {
                newValue = this.max;
            }
            else if (newValue <= this.min) {
                newValue = this.min;
            }
            else if (Math.abs(newValue - upper) < this._step) {
                return;
            }
            this._isSelf = true;
            this.upper = context.upper = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setUpperKnob();
            }
            if (trigger === false) {
                return;
            }
            this._trigger('input');
        };
        Range.prototype._setIncrement = function () {
            return (this._increment = this._maxOffset / (this.max - this.min));
        };
        Range.prototype._setPositionAndLength = function (element) {
            var isNode = this._utils.isNode(element), el = isNode ? element : this._slider.parentElement;
            switch (this._orientation) {
                case 'horizontal':
                    this._lengthProperty = 'width';
                    this._positionProperty = this._reversed ? 'right' : 'left';
                    this._maxOffset = el.offsetWidth;
                    break;
                case 'vertical':
                    this._lengthProperty = 'height';
                    this._positionProperty = this._reversed ? 'top' : 'bottom';
                    this._maxOffset = el.offsetHeight;
                    break;
                default:
                    var _Exception = this._Exception;
                    _Exception.warn('Invalid orientation "' + this._orientation + '" for "' + this.type + '."', _Exception.CONTROL);
                    return;
            }
            if (!(isNode || this._maxOffset)) {
                this._setOffsetWithClone(this._lengthProperty);
            }
        };
        Range.prototype._setLowerKnob = function (value) {
            var animationOptions = {}, upperKnobOffset = this._upperKnobOffset, upperOffset = this._utils.isNumber(upperKnobOffset) ? upperKnobOffset : this._setOffset(this._calculateKnobPosition(this.upper), false), position = this._calculateKnobPosition((value || this.lower));
            if (position === this._lowerKnobOffset) {
                return;
            }
            animationOptions[this._positionProperty] = position + 'px';
            animationOptions[this._lengthProperty] = (upperOffset - position) + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._lowerKnobOffset = position;
        };
        Range.prototype._setUpperKnob = function (value) {
            var animationOptions = {}, length = this._calculateKnobPosition((value || this.upper));
            if (length === this._upperKnobOffset) {
                return;
            }
            animationOptions[this._lengthProperty] = (length - this._lowerKnobOffset) + 'px';
            this._animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._upperKnobOffset = length;
        };
        Range.prototype._trigger = function (event) {
            var domEvent = plat.acquire(__DomEventInstance);
            domEvent.initialize(this.element, event);
            domEvent.trigger();
        };
        Range.prototype._setOffsetWithClone = function (dependencyProperty) {
            var element = this.element, body = this._document.body;
            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var _Exception = this._Exception, type = this.type;
                    _Exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' + 'DOM. Disposing of the ' + type + '.', _Exception.CONTROL);
                    plat.acquire(__TemplateControlFactory).dispose(this);
                    return;
                }
                this._utils.defer(this._setOffsetWithClone, 10, [dependencyProperty], this);
                return;
            }
            this._cloneAttempts = 0;
            var clone = element.cloneNode(true), regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, dependencyValue;
            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, 'important');
                element = element.parentElement;
                shallowCopy = element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(clone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._setPositionAndLength(clone.firstElementChild);
            body.removeChild(shallowCopy);
        };
        return Range;
    })(plat.ui.TemplateControl);
    platui.Range = Range;
    plat.register.control(__Range, Range);
    var Select = (function (_super) {
        __extends(Select, _super);
        function Select() {
            _super.apply(this, arguments);
        }
        Select.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Select + ' ' + (className || ''));
        };
        Select.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.setClasses();
        };
        return Select;
    })(plat.ui.controls.Select);
    platui.Select = Select;
    plat.register.control(__Select, Select);
    var Input = (function (_super) {
        __extends(Input, _super);
        function Input() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-input-container">\n' + '    <span class="plat-input-image"></span>\n' + '    <input type="text" />\n' + '    <div class="plat-input-action"></div>\n' + '</div>\n';
            this._utils = plat.acquire(__Utils);
            this._compat = plat.acquire(__Compat);
            this._regex = plat.acquire(__Regex);
            this._inTouch = false;
            this._inAction = false;
            this._usingBind = false;
            this._loaded = false;
            this._preloadedValue = '';
        }
        Input.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Input + ' ' + (className || ''));
        };
        Input.prototype.initialize = function () {
            this.setClasses();
        };
        Input.prototype.setTemplate = function () {
            var element = this.element, image = this._imageElement = element.firstElementChild.firstElementChild, input = this._inputElement = image.nextElementSibling, attributes = element.attributes, length = attributes.length, hasPlaceholder = false, attrRegex = /plat-(?!control|hide|options)/, attribute, _utils = this._utils, name;
            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                name = attribute.name;
                if (attrRegex.test(name)) {
                    if (name === __Bind || name === 'data-' + __Bind) {
                        this._usingBind = true;
                    }
                    else {
                        input.setAttribute(name, attribute.value);
                    }
                }
                else if (name === 'type') {
                    this._type = attribute.value;
                }
                else if (name === 'placeholder') {
                    input.placeholder = attribute.value;
                    hasPlaceholder = true;
                }
            }
            if (hasPlaceholder) {
                return;
            }
            var placeholder = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (!_utils.isEmpty(placeholder)) {
                input.placeholder = placeholder;
            }
        };
        Input.prototype.loaded = function () {
            var optionObj = this.options || {}, options = optionObj.value || {}, element = this.element, type = this._type = this._type || options.type || 'text', pattern = options.pattern;
            this._imageElement = this._imageElement || element.firstElementChild.firstElementChild;
            this._inputElement = this._inputElement || this._imageElement.nextElementSibling;
            this.dom.addClass(element, __Plat + type);
            this._actionElement = this._inputElement.nextElementSibling;
            if (this._utils.isString(pattern)) {
                if (pattern[0] === '/' && pattern[pattern.length - 1] === '/') {
                    pattern = pattern.slice(1, -1);
                }
                this._pattern = new RegExp(pattern);
            }
            this._initializeType();
            this._loaded = true;
        };
        Input.prototype.dispose = function () {
            this._loaded = false;
        };
        Input.prototype.validate = function () {
            return this._pattern.test(this._inputElement.value);
        };
        Input.prototype.clear = function () {
            var inputElement = this._inputElement, value = inputElement.value;
            if (value === '') {
                return;
            }
            var actionElement = this._actionElement;
            this.propertyChanged((inputElement.value = ''), value);
            actionElement.textContent = this._typeChar = '';
            actionElement.setAttribute(__Hide, '');
        };
        Input.prototype.focus = function () {
            this._inputElement.focus();
        };
        Input.prototype.blur = function () {
            this._inputElement.blur();
        };
        Input.prototype.value = function () {
            return this._inputElement.value;
        };
        Input.prototype.setProperty = function (newValue, oldValue) {
            if (!this._loaded) {
                this._preloadedValue = newValue;
                return;
            }
            this._onInputChanged(newValue);
        };
        Input.prototype._initializeType = function () {
            var type = this._type, event = __$tap, actionElement = this._actionElement;
            switch (type) {
                case 'email':
                    this._pattern = this._pattern || this._regex.validateEmail;
                    this._actionHandler = this._checkEmail.bind(this);
                    this._typeHandler = this._handleEmail;
                    break;
                case 'password':
                    var hidePassword = this._handlePasswordHide;
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._actionHandler = this._checkPassword.bind(this);
                    this._typeHandler = this._handlePasswordShow;
                    this.addEventListener(actionElement, __$touchend, hidePassword);
                    this.addEventListener(actionElement, __$trackend, hidePassword);
                    event = __$touchstart;
                    break;
                case 'tel':
                case 'telephone':
                    this._pattern = this._pattern || this._regex.validateTelephone;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    break;
                case 'number':
                    this._pattern = this._pattern || /^[0-9\.,]*$/;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    type = 'tel';
                    break;
                default:
                    this._pattern = this._pattern || /[\S\s]*/;
                    this._actionHandler = this._checkText.bind(this);
                    this._typeHandler = this._erase;
                    break;
            }
            this._inputElement.type = type;
            actionElement.textContent = this._typeChar = '';
            actionElement.setAttribute(__Hide, '');
            this._addEventListeners(event);
        };
        Input.prototype._addEventListeners = function (event) {
            var _this = this;
            var actionElement = this._actionElement, input = this._inputElement, actionEnd = function () { return (_this._inAction = false); };
            this.addEventListener(actionElement, event, this._typeHandler, false);
            this.addEventListener(actionElement, __$touchstart, function () { return (_this._inAction = true); }, false);
            this.addEventListener(actionElement, __$touchend, actionEnd, false);
            this.addEventListener(actionElement, __$trackend, actionEnd, false);
            this.addEventListener(input, 'focus', function () {
                if (input.value === '') {
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }, false);
            this.addEventListener(input, 'blur', function (ev) {
                if (_this._inAction) {
                    return;
                }
                actionElement.setAttribute(__Hide, '');
            }, false);
            if (this._usingBind) {
                this._checkInput(this._preloadedValue);
            }
            this._addTextEventListener();
        };
        Input.prototype._addTextEventListener = function () {
            var _this = this;
            var input = this._inputElement, _compat = this._compat, _utils = this._utils, composing = false, timeout, eventListener = function () {
                if (composing) {
                    return;
                }
                _this._onInput();
            }, postponedEventListener = function () {
                if (_utils.isFunction(timeout)) {
                    return;
                }
                timeout = _utils.postpone(function () {
                    eventListener();
                    timeout = null;
                });
            };
            if (_utils.isUndefined(_compat.ANDROID)) {
                this.addEventListener(input, 'compositionstart', function () { return (composing = true); }, false);
                this.addEventListener(input, 'compositionend', function () {
                    composing = false;
                    eventListener();
                }, false);
            }
            if (_compat.hasEvent('input')) {
                this.addEventListener(input, 'input', eventListener, false);
            }
            else {
                this.addEventListener(input, 'keydown', function (ev) {
                    var key = ev.keyCode;
                    if (key === 91 || key === 92 || (key > 15 && key < 28) || (key > 32 && key < 41)) {
                        return;
                    }
                    postponedEventListener();
                }, false);
                this.addEventListener(input, 'cut', postponedEventListener, false);
                this.addEventListener(input, 'paste', postponedEventListener, false);
            }
            this.addEventListener(input, 'change', eventListener, false);
        };
        Input.prototype._erase = function () {
            this.clear();
            this.focus();
        };
        Input.prototype._handlePasswordShow = function () {
            this._inTouch = true;
            this._inputElement.type = 'text';
        };
        Input.prototype._handlePasswordHide = function () {
            if (!this._inTouch) {
                return;
            }
            this._inTouch = false;
            var inputElement = this._inputElement;
            inputElement.type = this._type;
            inputElement.focus();
        };
        Input.prototype._handleEmail = function () {
            var inputElement = this._inputElement, value = inputElement.value, char = this._typeChar;
            this.propertyChanged((inputElement.value = (char === 'x' ? '' : value + char)), value);
            this._checkEmail();
            inputElement.focus();
        };
        Input.prototype._checkText = function () {
            var char = this._typeChar;
            if (char === 'x') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            }
            else if (this._inputElement.value !== '') {
                this._typeChar = 'x';
            }
            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }
        };
        Input.prototype._checkPassword = function () {
            var char = this._typeChar;
            if (char === '?') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            }
            else if (this._inputElement.value !== '') {
                this._typeChar = '?';
            }
            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }
        };
        Input.prototype._checkEmail = function () {
            var value = this._inputElement.value, char = this._typeChar;
            switch (char) {
                case '@':
                    if (value.indexOf('@') !== -1) {
                        if (value.indexOf('.com') !== -1) {
                            this._typeChar = 'x';
                            break;
                        }
                        this._typeChar = '.com';
                    }
                    break;
                case '.com':
                    if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    }
                    else if (value.indexOf('.com') !== -1) {
                        this._typeChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this._typeChar = '';
                    }
                    else if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    }
                    else if (value.indexOf('.com') === -1) {
                        this._typeChar = '.com';
                    }
                    break;
                default:
                    if (value === '') {
                        this._typeChar = '';
                    }
                    else if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    }
                    break;
            }
            var newChar = this._typeChar;
            if (char !== newChar) {
                var actionElement = this._actionElement;
                actionElement.textContent = newChar;
                if (newChar === '') {
                    actionElement.setAttribute(__Hide, '');
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }
        };
        Input.prototype._onInput = function () {
            var inputElement = this._inputElement, value = inputElement.value;
            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = value.length - 1;
                    if (last >= 0 && (!this._pattern.test(value[last]) || !(last === 0 || this._type !== 'tel' || value[last] !== '+'))) {
                        value = inputElement.value = value.slice(0, -1);
                    }
                default:
                    this.propertyChanged(value);
                    break;
            }
            this._actionHandler();
        };
        Input.prototype._onInputChanged = function (newValue) {
            var inputElement = this._inputElement;
            if (newValue === inputElement.value) {
                return;
            }
            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = newValue.length - 1;
                    if (last >= 0 && (!this._pattern.test(newValue[last]) || !(last === 0 || this._type !== 'tel' || newValue[last] !== '+'))) {
                        newValue = inputElement.value = newValue.slice(0, -1);
                        this.propertyChanged(newValue);
                        break;
                    }
                default:
                    inputElement.value = newValue;
                    break;
            }
            this._actionHandler();
        };
        Input.prototype._checkInput = function (value) {
            switch (this._type) {
                case 'tel':
                case 'number':
                    if (this._pattern.test(value)) {
                        this._inputElement.value = value;
                    }
                    else {
                        if (this._usingBind) {
                            var _Exception = this._Exception;
                            _Exception.warn(this.type + ' control is bound to a value that does not satisfy ' + 'the given pattern and/or type. The bound value will be reset to "".', _Exception.CONTROL);
                        }
                        this.propertyChanged((this._inputElement.value = ''), value);
                    }
                    break;
                default:
                    this._inputElement.value = value;
                    break;
            }
            this._actionHandler();
            this._actionElement.setAttribute(__Hide, '');
        };
        return Input;
    })(plat.ui.BindablePropertyControl);
    platui.Input = Input;
    plat.register.control(__Input, Input);
    var Carousel = (function (_super) {
        __extends(Carousel, _super);
        function Carousel() {
            _super.apply(this, arguments);
            this.templateString = '<div class="plat-carousel-container">\n' + '    <plat-foreach class="plat-carousel-slider"></plat-foreach>\n' + '</div>\n';
            this._utils = plat.acquire(__Utils);
            this._compat = plat.acquire(__Compat);
            this._document = plat.acquire(__Document);
            this._window = plat.acquire(__Window);
            this._animator = plat.acquire(__Animator);
            this._hasSwiped = false;
            this._lastTouch = { x: 0, y: 0 };
            this._loaded = false;
            this._index = 0;
            this._currentOffset = 0;
            this._cloneAttempts = 0;
            this._maxCloneAttempts = 25;
        }
        Object.defineProperty(Carousel.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Carousel.prototype.setClasses = function (className, element) {
            this.dom.addClass(element || this.element, __Carousel + ' ' + (className || ''));
        };
        Carousel.prototype.contextChanged = function () {
            this._verifyLength();
            if (this._loaded) {
                return;
            }
            this.loaded();
        };
        Carousel.prototype.initialize = function () {
            this.setClasses();
        };
        Carousel.prototype.setTemplate = function () {
            var itemContainer = this._document.createElement('div'), container = this._container = this.element.firstElementChild;
            itemContainer.className = 'plat-carousel-item';
            itemContainer.appendChild(this.innerTemplate);
            container.firstElementChild.appendChild(itemContainer);
        };
        Carousel.prototype.loaded = function () {
            var _this = this;
            var _utils = this._utils, context = this.context;
            if (!_utils.isArray(context)) {
                var _Exception = this._Exception;
                _Exception.warn('The context of a ' + this.type + ' must be an Array.', _Exception.CONTEXT);
                return;
            }
            var optionObj = this.options || {}, options = optionObj.value || {}, orientation = this._orientation = options.orientation || 'horizontal', type = options.type || 'track', index = options.index;
            this.dom.addClass(this.element, __Plat + orientation);
            index = _utils.isNumber(index) && index >= 0 ? index < context.length ? index : (context.length - 1) : this._index;
            this._index = 0;
            this._onLoad = function () {
                _this.goToIndex(index);
                _this._addEventListeners(type);
            };
            this._init();
            this._loaded = true;
        };
        Carousel.prototype.setProperty = function (newValue, oldValue, firstSet) {
            if (!this._utils.isNumber(newValue)) {
                newValue = Number(newValue);
                if (!this._utils.isNumber(newValue)) {
                    return;
                }
            }
            if (this._loaded) {
                this.goToIndex(newValue);
                return;
            }
            this._index = newValue;
        };
        Carousel.prototype.goToNext = function () {
            var index = this._index;
            if (index >= this.context.length - 1) {
                return;
            }
            var animationOptions = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(-this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });
            this.propertyChanged(++this._index, index);
        };
        Carousel.prototype.goToPrevious = function () {
            var index = this._index;
            if (index <= 0) {
                return;
            }
            var animationOptions = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });
            this.propertyChanged(--this._index, index);
        };
        Carousel.prototype.goToIndex = function (index) {
            var oldIndex = this._index;
            if (index === oldIndex || index < 0 || index >= this.context.length) {
                return;
            }
            var animationOptions = {}, interval = (this._index - index) * this._intervalOffset;
            animationOptions[this._transform] = this._calculateStaticTranslation(interval);
            this._initiateAnimation({ properties: animationOptions });
            this.propertyChanged((this._index = index), oldIndex);
        };
        Carousel.prototype._reset = function () {
            var animationOptions = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(0);
            this._initiateAnimation({ properties: animationOptions });
        };
        Carousel.prototype._verifyLength = function () {
            var maxIndex = this.context.length - 1, maxOffset = maxIndex * this._intervalOffset;
            if (-this._currentOffset > maxOffset) {
                this.goToIndex(maxIndex);
            }
        };
        Carousel.prototype._initiateAnimation = function (animationOptions) {
            var _this = this;
            if (!this._utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(function () {
                    _this._animationThenable = _this._animator.animate(_this._slider, __Transition, animationOptions).then(function () {
                        _this._animationThenable = null;
                    });
                });
                return;
            }
            this._animationThenable = this._animator.animate(this._slider, __Transition, animationOptions).then(function () {
                _this._animationThenable = null;
            });
        };
        Carousel.prototype._init = function () {
            var _this = this;
            var foreach = this.controls[0], container = this._container || this.element.firstElementChild;
            this._slider = container.firstElementChild;
            this._setTransform();
            this.itemsLoaded = foreach.itemsLoaded.then(function () {
                if (_this._setPosition()) {
                    _this._onLoad();
                }
            }).catch(function () {
                var _Exception = _this._Exception;
                _Exception.warn('An error occurred while processing the ' + _this.type + '. Please ensure you\'re context is correct.', _Exception.CONTROL);
                _this._loaded = false;
                return;
            });
        };
        Carousel.prototype._addEventListeners = function (type) {
            var _this = this;
            var types = type.split(' ');
            if (types.indexOf('tap') !== -1) {
                this._initializeTap();
            }
            if (types.indexOf('swipe') !== -1) {
                this._initializeSwipe();
            }
            if (types.indexOf('track') !== -1) {
                this._initializeTrack();
            }
            this.observeArray(this, __CONTEXT, null, this._verifyLength);
            this.addEventListener(this._window, 'resize', function () {
                _this._setPosition();
            }, false);
        };
        Carousel.prototype._initializeTap = function () {
            var _document = this._document, element = this.element, backArrowContainer = _document.createElement('div'), forwardArrowContainer = _document.createElement('div'), backArrow = _document.createElement('span'), forwardArrow = _document.createElement('span');
            backArrowContainer.className = __Plat + 'back-arrow';
            forwardArrowContainer.className = __Plat + 'forward-arrow';
            backArrowContainer.appendChild(backArrow);
            forwardArrowContainer.appendChild(forwardArrow);
            element.appendChild(backArrowContainer);
            element.appendChild(forwardArrowContainer);
            this.addEventListener(backArrowContainer, __$tap, this.goToPrevious, false);
            this.addEventListener(forwardArrowContainer, __$tap, this.goToNext, false);
        };
        Carousel.prototype._initializeSwipe = function () {
            var container = this._container, swipeFn = this._handleSwipe, swipe, reverseSwipe;
            switch (this._orientation) {
                case 'horizontal':
                    swipe = __$swipe + 'left';
                    reverseSwipe = __$swipe + 'right';
                    break;
                case 'vertical':
                    swipe = __$swipe + 'up';
                    reverseSwipe = __$swipe + 'down';
                    break;
                default:
                    return;
            }
            this.addEventListener(container, swipe, swipeFn, false);
            this.addEventListener(container, reverseSwipe, swipeFn, false);
        };
        Carousel.prototype._initializeTrack = function () {
            var container = this._container, trackFn = this._track, touchEnd = this._touchEnd, track, reverseTrack;
            switch (this._orientation) {
                case 'horizontal':
                    track = __$track + 'left';
                    reverseTrack = __$track + 'right';
                    break;
                case 'vertical':
                    track = __$track + 'up';
                    reverseTrack = __$track + 'down';
                    break;
                default:
                    return;
            }
            this.addEventListener(container, track, trackFn, false);
            this.addEventListener(container, reverseTrack, trackFn, false);
            this.addEventListener(container, __$touchstart, this._touchStart, false);
            this.addEventListener(container, __$trackend, touchEnd, false);
            this.addEventListener(container, __$touchend, touchEnd, false);
        };
        Carousel.prototype._handleSwipe = function (ev) {
            var direction = ev.direction.primary, hasSwiped = false;
            switch (direction) {
                case 'left':
                    if (this._orientation === 'horizontal' && this.index + 1 < this.context.length) {
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'right':
                    if (this._orientation === 'horizontal' && this.index - 1 >= 0) {
                        hasSwiped = true;
                        this.goToPrevious();
                    }
                    break;
                case 'up':
                    if (this._orientation === 'vertical' && this.index + 1 < this.context.length) {
                        hasSwiped = true;
                        this.goToNext();
                    }
                    break;
                case 'down':
                    if (this._orientation === 'vertical' && this.index - 1 >= 0) {
                        hasSwiped = true;
                        this.goToPrevious();
                    }
                    break;
                default:
                    return;
            }
            this._hasSwiped = hasSwiped;
        };
        Carousel.prototype._touchStart = function (ev) {
            var _this = this;
            if (this._inTouch) {
                return;
            }
            if (!this._utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(function () {
                    _this._animationThenable = null;
                    _this._initTouch(ev);
                });
                return;
            }
            this._initTouch(ev);
        };
        Carousel.prototype._initTouch = function (ev) {
            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        };
        Carousel.prototype._touchEnd = function (ev) {
            var inTouch = this._inTouch, hasSwiped = this._hasSwiped;
            this._inTouch = this._hasSwiped = false;
            if (!inTouch || hasSwiped) {
                return;
            }
            var distanceMoved = (this._orientation === 'vertical') ? (ev.clientY - this._lastTouch.y) : (ev.clientX - this._lastTouch.x);
            if (Math.abs(distanceMoved) > Math.ceil(this._intervalOffset / 2)) {
                if (distanceMoved < 0) {
                    if (this._index < this.context.length - 1) {
                        this.goToNext();
                        return;
                    }
                }
                else if (this._index > 0) {
                    this.goToPrevious();
                    return;
                }
            }
            this._reset();
        };
        Carousel.prototype._track = function (ev) {
            var _this = this;
            this._utils.requestAnimationFrame(function () {
                _this._slider.style[_this._transform] = _this._calculateDynamicTranslation(ev);
            });
        };
        Carousel.prototype._calculateStaticTranslation = function (interval) {
            if (this._orientation === 'vertical') {
                return 'translate3d(0,' + (this._currentOffset += interval) + 'px,0)';
            }
            return 'translate3d(' + (this._currentOffset += interval) + 'px,0,0)';
        };
        Carousel.prototype._calculateDynamicTranslation = function (ev) {
            if (this._orientation === 'vertical') {
                return 'translate3d(0,' + (this._currentOffset + (ev.clientY - this._lastTouch.y)) + 'px,0)';
            }
            return 'translate3d(' + (this._currentOffset + (ev.clientX - this._lastTouch.x)) + 'px,0,0)';
        };
        Carousel.prototype._setTransform = function () {
            var style = this.element.style, isUndefined = this._utils.isUndefined;
            if (!isUndefined(style.transform)) {
                this._transform = 'transform';
                return;
            }
            var vendorPrefix = this._compat.vendorPrefix;
            if (!isUndefined(style[(vendorPrefix.lowerCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
            else if (!isUndefined(style[(vendorPrefix.upperCase + 'Transform')])) {
                this._transform = vendorPrefix.lowerCase + 'Transform';
            }
        };
        Carousel.prototype._setPosition = function (element) {
            var isNode = this._utils.isNode(element), el = isNode ? element : this._container, dependencyProperty;
            switch (this._orientation) {
                case 'vertical':
                    this._positionProperty = 'top';
                    dependencyProperty = 'height';
                    this._intervalOffset = el.offsetHeight;
                    break;
                default:
                    this._positionProperty = 'left';
                    dependencyProperty = 'width';
                    this._intervalOffset = el.offsetWidth;
                    break;
            }
            if (!(isNode || this._intervalOffset)) {
                this._setOffsetWithClone(dependencyProperty);
                return false;
            }
            return true;
        };
        Carousel.prototype._setOffsetWithClone = function (dependencyProperty) {
            var element = this.element, body = this._document.body;
            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var _Exception = this._Exception, type = this.type;
                    _Exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' + 'DOM. Disposing of the ' + type + '.', _Exception.CONTROL);
                    plat.acquire(__TemplateControlFactory).dispose(this);
                    return;
                }
                this._utils.defer(this._setOffsetWithClone, 10, [dependencyProperty], this);
                return;
            }
            this._cloneAttempts = 0;
            var clone = element.cloneNode(true), regex = /\d+(?!\d+|%)/, _window = this._window, parentChain = [], shallowCopy = clone, computedStyle, dependencyValue;
            shallowCopy.id = '';
            while (!regex.test((dependencyValue = (computedStyle = _window.getComputedStyle(element))[dependencyProperty]))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty(dependencyProperty, dependencyValue, 'important');
                element = element.parentElement;
                shallowCopy = element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }
            if (parentChain.length > 0) {
                var curr = parentChain.pop(), currStyle = curr.style, temp;
                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }
                curr.insertBefore(clone, null);
            }
            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty(dependencyProperty, dependencyValue, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._setPosition(clone.firstElementChild);
            body.removeChild(shallowCopy);
            this._onLoad();
        };
        return Carousel;
    })(plat.ui.BindablePropertyControl);
    platui.Carousel = Carousel;
    plat.register.control(__Carousel, Carousel);
})(platui || (platui = {}));
module.exports = platui;
//# sourceMappingURL=platypusui.js.map