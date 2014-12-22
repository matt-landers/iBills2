/* tslint:disable */
/**
 * Copyright 2014 Platypi, LLC. All rights reserved. 
 * 
 * PlatypusUI is licensed under the GPL-3.0 found at  
 * http://opensource.org/licenses/GPL-3.0 
 * 
 */
    /**
     * @name platui
     * @kind namespace
     * @access public
     * 
     * @description
     * The entry point into the platypus UI controls library.
     */
module platui {
    /* tslint:disable:no-unused-variable */
    /*
     * Injectables
     */
    var __Promise = '$Promise',
        __Compat = '$Compat',
        __Regex = '$Regex',
        __Window = '$Window',
        __Document = '$Document',
        __ExceptionStatic = '$ExceptionStatic',
        __Utils = '$Utils',
        __Animator = '$Animator',
    
        /**
         * Controls
         */
        __Plat = 'plat-',
        __Button = __Plat + 'button',
        __Checkbox = __Plat + 'checkbox',
        __Drawer = __Plat + 'drawer',
        __DrawerController = __Plat + 'drawer-controller',
        __Modal = __Plat + 'modal',
        __Navbar = __Plat + 'navbar',
        __ProgressBar = __Plat + 'progress',
        __ProgressRing = __Plat + 'ring',
        __Radio = __Plat + 'radio',
        __Toggle = __Plat + 'toggle',
        __Slider = __Plat + 'slider',
        __Range = __Plat + 'range',
        __Select = __Plat + 'select',
        __Input = __Plat + 'input',
        __Carousel = __Plat + 'carousel',
        __TemplateControlFactory = '$TemplateControlFactory',
    
        /**
         * Referenced Controls / Vars
         */
        __Hide = __Plat + 'hide',
        __Hidden = __Plat + 'hidden',
        __Checked = __Plat + 'checked',
        __CamelChecked = 'platChecked',
        __Context = __Plat + 'context',
        __CamelContext = 'platContext',
        __Bind = __Plat + 'bind',
    
        /**
         * Animations
         */
        __Transition = __Plat + 'transition',
        __NavbarActionPulse = __Plat + 'navbar-action-pulse',
    
        /**
         * Events
         */
        __$tap = '$tap',
        __$touchstart = '$touchstart',
        __$touchend = '$touchend',
        __$swipe = '$swipe',
        __$track = '$track',
        __$trackend = '$trackend',
        __ButtonPrefix = '__plat-button-',
        __RadioPrefix = '__plat-radio-',
        __DrawerControllerInitEvent = '__platDrawerControllerInit',
        __DrawerControllerFetchEvent = '__platDrawerControllerFetch',
        __DrawerFoundEvent = '__platDrawerFound',
        __DrawerControllerDisposing = '__platDrawerControllerDisposing',
        __DrawerControllerDisposingFound = '__platDrawerControllerDisposingFound',
    
        /**
         * Misc
         */
        __Reversed = '-reversed',
        __transitionNegate: plat.IObject<string> = {
            right: 'left',
            left: 'right',
            up: 'down',
            down: 'up'
        };
    /* tslint:enable:no-unused-variable */
    
    /**
     * @name IUIControl
     * @memberof platui
     * @kind interface
     * 
     * @description
     * An interface a control should implement if they plan on using 
     * class based CSS to style the UI.
     */
    export interface IUIControl {
        /**
         * @name setClasses
         * @memberof platui.IUIControl
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(classNames?: any, element?: Element): void;
    }

    /**
     * @name IFormControl
     * @memberof platui
     * @kind interface
     * 
     * @description
     * An interface a control should implement if validation is necessary.
     */
    export interface IFormControl {
        /**
         * @name validate
         * @memberof platui.IFormControl
         * @kind function
         * @access public
         * 
         * @description
         * A function to validate user input.
         * 
         * @returns {boolean} Whether or not the user input is valid.
         */
        validate(): boolean;
    }

    /// <reference path="../../references.d.ts" />
    
    /**
     * @name Button
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes an HTML5 button.
     */
    export class Button extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $document
         * @memberof platui.Button
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);

        /**
         * @name replaceWith
         * @memberof platui.Button
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the <plat-button> node with 
         * a <button> node.
         */
        replaceWith = 'button';

        /**
         * @name options
         * @memberof platui.Button
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IButtonOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IButtonOptions>;

        /**
         * @name groupName
         * @memberof platui.Button
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The button groups name if a button group is present.
         */
        groupName = '';

        /**
         * @name _isSelected
         * @memberof platui.Button
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value showing the selected state of this {@link platui.Button|Button}.
         */
        protected _isSelected: boolean;

        /**
         * @name setClasses
         * @memberof platui.Button
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Button + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Button
         * @kind function
         * @access public
         * 
         * @description
         * Sets default classes.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Button
         * @kind function
         * @access public
         * 
         * @description
         * Wrap all inner text nodes in spans.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var $document = this.$document,
                element = this.element,
                childNodes = Array.prototype.slice.call(element.childNodes),
                childNode: Node,
                span: HTMLSpanElement,
                match: Array<string>;

            if (childNodes.length === 0) {
                span = $document.createElement('span');
                element.insertBefore(span, null);
                return;
            }

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = $document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                } else {
                    element.insertBefore(childNode, null);
                }
            }
        }

        /**
         * @name loaded
         * @memberof platui.Button
         * @kind function
         * @access public
         * 
         * @description
         * Determine the button style and apply the proper classes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var element = this.element,
                optionObj = this.options || <plat.observable.IObservableProperty<IButtonOptions>>{},
                options = optionObj.value || <IButtonOptions>{},
                group = options.group;

            if (!group) {
                if (element.hasAttribute(__Bind)) {
                    this._addEventListeners(element.getAttribute(__Bind));
                } else if (element.hasAttribute('data-' + __Bind)) {
                    this._addEventListeners(element.getAttribute('data-' + __Bind));
                }
                return;
            }

            this._addEventListeners(group);
        }

        /**
         * @name _addEventListeners
         * @memberof platui.Button
         * @kind function
         * @access protected
         * 
         * @description
         * Add event listeners for selection.
         * 
         * @returns {void}
         */
        protected _addEventListeners(name: string): void {
            var element = this.element,
                dom = this.dom;

            this.groupName = name;
            this._isSelected = false;
            this.addEventListener(element, __$tap, this._onTap, false);
            this.on(__ButtonPrefix + name, () => {
                if (this._isSelected) {
                    dom.removeClass(element, 'plat-selected');
                    this._isSelected = false;
                }
            });
        }

        /**
         * @name _onTap
         * @memberof platui.Button
         * @kind function
         * @access protected
         * 
         * @description
         * Place the pushed button in a selected state.
         * 
         * @returns {void}
         */
        protected _onTap(): void {
            if (this._isSelected) {
                return;
            }

            var element = this.element;
            this.dom.addClass(element, 'plat-selected');
            this.dispatchEvent(__ButtonPrefix + this.groupName, plat.events.EventManager.DIRECT);
            this._isSelected = true;
            this.propertyChanged(element.textContent);
        }
    }

    plat.register.control(__Button, Button);

    /**
     * @name IButtonOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Button|Button} control.
     */
    export interface IButtonOptions {
        /**
         * @name group
         * @memberof platui.IButtonOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The group name of this {@link platui.Button|Button's} associated button group.
         */
        group?: string;
    }

    /**
     * @name Select
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.IBindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that simulates a toggle switch.
     */
    export class Toggle extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.Toggle
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * @name templateString
         * @memberof platui.Toggle
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-toggle-container">' +
        '    <div class="plat-knob"></div>' +
        '</div>';

        /**
         * @name isActive
         * @memberof platui.Toggle
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value indicating whether the control is actively selected.
         */
        isActive = false;

        /**
         * @name _targetType
         * @memberof platui.Toggle
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The type of the control's activated element.
         */
        protected _targetType = 'slide';

        /**
         * @name _targetElement
         * @memberof platui.Toggle
         * @kind property
         * @access protected
         * 
         * @type {Element}
         * 
         * @description
         * The element used to create the targeted effect.
         */
        protected _targetElement: Element;

        /**
         * @name setClasses
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Toggle + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name loaded
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * Adds a listener for the tap event.
         * 
         * @returns {void}
         */
        loaded(): void {
            var element = this.element;
            this._targetElement = this._targetElement || element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);
        }

        /**
         * @name setProperty
         * @memberof platui.Toggle
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * @param {boolean} setProperty? A boolean value indicating whether we should set 
         * the property if we need to toggle the activated state.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            }

            var isActive = !!newValue;
            if (isActive === this.isActive) {
                return;
            }

            this._toggle(setProperty);
        }

        /**
         * @name _onTap
         * @memberof platui.Toggle
         * @kind function
         * @access protected
         * 
         * @description
         * The callback for a tap event.
         * 
         * @param {plat.ui.IGestureEvent} ev The tap event object.
         * 
         * @returns {void}
         */
        protected _onTap(ev: plat.ui.IGestureEvent): void {
            var domEvent = plat.acquire(plat.ui.IDomEventInstance);

            this._toggle(true);

            domEvent.initialize(this.element, 'change');
            domEvent.trigger();
        }

        /**
         * @name _toggle
         * @memberof platui.Toggle
         * @kind function
         * @access protected
         * 
         * @description
         * Toggles the mark and updates the bindable property if needed.
         * 
         * @param {boolean} setProperty? A boolean value stating whether the bindable 
         * property should be updated.
         * 
         * @returns {void}
         */
        protected _toggle(setProperty?: boolean): void {
            var wasActive = this.isActive,
                isActive = !wasActive;

            this._activate(this._targetElement || (this._targetElement = this.element.firstElementChild));
            this.isActive = (<HTMLInputElement>this.element).checked = isActive;
            if (setProperty === true) {
                this.propertyChanged(isActive, wasActive);
            }
        }

        /**
         * @name _activate
         * @memberof platui.Toggle
         * @kind function
         * @access protected
         * 
         * @description
         * A function to activate the given element by toggling the 
         * class specified as the target type.
         * 
         * @param {Element} element The element to activate.
         * 
         * @returns {void}
         */
        protected _activate(element: Element): void {
            this.dom.toggleClass(element, __Plat + this._targetType);
        }
    }

    plat.register.control(__Toggle, Toggle);

    /**
     * @name Checkbox
     * @memberof platui
     * @kind class
     * 
     * @extends {platui.Toggle}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes the HTML5 checkbox.
     */
    export class Checkbox extends Toggle {
        /**
         * @name $document
         * @memberof platui.Checkbox
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);

        /**
         * @name templateString
         * @memberof platui.Checkbox
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-checkbox-container">\n' +
        '    <span class="plat-mark"></span>\n' +
        '</div>\n';

        /**
         * @name options
         * @memberof platui.Checkbox
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.ICheckboxOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<ICheckboxOptions>;

        /**
         * @name _targetTypeSet
         * @memberof platui.Checkbox
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the target type has been set already or not.
         */
        protected _targetTypeSet = false;

        /**
         * @name setClasses
         * @memberof platui.Checkbox
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Checkbox + ' ' + (className || ''));
        }

        /**
         * @name setTemplate
         * @memberof platui.Checkbox
         * @kind function
         * @access public
         * 
         * @description
         * Adds the inner template to the DOM making sure to wrap text nodes in spans.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var isNull = this.$utils.isNull,
                innerTemplate = this.innerTemplate;

            if (isNull(innerTemplate)) {
                return;
            }

            var $document = this.$document,
                element = this.element,
                childNodes = Array.prototype.slice.call(innerTemplate.childNodes),
                childNode: Node,
                span: HTMLSpanElement,
                match: Array<string>;

            while (childNodes.length > 0) {
                childNode = childNodes.shift();
                if (childNode.nodeType === Node.TEXT_NODE) {
                    match = childNode.textContent.trim().match(/[^\r\n]/g);
                    if (match !== null && match.length > 0) {
                        span = $document.createElement('span');
                        span.insertBefore(childNode, null);
                        element.insertBefore(span, null);
                    }
                } else {
                    element.insertBefore(childNode, null);
                }
            }
        }

        /**
         * @name loaded
         * @memberof platui.Checkbox
         * @kind function
         * @access public
         * 
         * @description
         * Checks for checked attributes and handles them accordingly. Also, 
         * initializes the mark and adds a listener for the tap event.
         * 
         * @returns {void}
         */
        loaded(): void {
            super.loaded();

            var optionObj = this.options || <plat.observable.IObservableProperty<ICheckboxOptions>>{},
                options = optionObj.value || <ICheckboxOptions>{},
                previousType = this._targetType,
                mark = this._targetType = options.mark || 'check';

            this._convertChecked();

            switch (mark.toLowerCase()) {
                case 'check':
                case 'x':
                    break;
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid mark option specified for' + this.type + '. Defaulting to checkmark.');
                    this._targetType = 'check';
                    break;
            }

            if (this._targetTypeSet) {
                var target = this._targetElement;
                this.dom.removeClass(target, previousType);
                this._activate(target);
            }

            this._targetTypeSet = true;
        }

        /**
         * @name _convertChecked
         * @memberof platui.Checkbox
         * @kind function
         * @access protected
         * 
         * @description
         * A function for checking "checked" attributes and handling them accordingly.
         * 
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         * 
         * @returns {void}
         */
        protected _convertChecked(): void {
            var element = this.element;
            if (element.hasAttribute(__Checked)) {
                this._convertAttribute(element.getAttribute(__Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
            } else if (element.hasAttribute('data-' + __Checked)) {
                this._convertAttribute(element.getAttribute('data-' + __Checked));
                this.attributes.observe(__CamelChecked, this._convertAttribute);
            } else if (element.hasAttribute('checked') || element.hasAttribute('data-checked')) {
                this._convertAttribute(true);
            }
        }

        /**
         * @name _convertAttribute
         * @memberof platui.Checkbox
         * @kind function
         * @access protected
         * 
         * @description
         * A function for handling the attribute value conversion for updating the 
         * bound property.
         * 
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         * 
         * @returns {void}
         */
        protected _convertAttribute(newValue: any, oldValue?: any): void {
            var $utils = this.$utils;
            if ($utils.isBoolean(newValue)) {
                return this.setProperty(newValue, oldValue, true);
            } else if (!$utils.isString(newValue)) {
                return;
            }

            this.setProperty(newValue === 'true', oldValue === 'true', true);
        }

        /**
         * @name _activate
         * @memberof platui.Checkbox
         * @kind function
         * @access protected
         * 
         * @description
         * A function to activate the given element by toggling the 
         * class specified as the target type.
         * 
         * @param {Element} element The element to activate.
         * 
         * @returns {void}
         */
        protected _activate(element: Element): void {
            if (this._targetTypeSet) {
                this.dom.toggleClass(element, __Plat + this._targetType);
                return;
            }

            this._targetTypeSet = true;
        }
    }

    plat.register.control(__Checkbox, Checkbox);

    /**
     * @name ICheckboxOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Checkbox|Checkbox} control.
     */
    export interface ICheckboxOptions {
        /**
         * @name mark
         * @memberof platui.ICheckboxOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of mark to place inside the {@link platui.Checkbox|Checkbox}. 
         * Defaults to "check".
         * 
         * @remarks
         * - "check"
         * - "x"
         */
        mark?: string;
    }

    /**
     * @name Radio
     * @memberof platui
     * @kind class
     * 
     * @extends {platui.Checkbox}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes the HTML5 radio button.
     */
    export class Radio extends Checkbox {
        /**
         * @name templateString
         * @memberof platui.Radio
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-radio-container">' +
        '    <div class="plat-mark"></div>' +
        '</div>';

        /**
         * @name groupName
         * @memberof platui.Radio
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The radio groups name if a radio group is present.
         */
        groupName = '';

        /**
         * @name _targetType
         * @memberof platui.Radio
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The check type to be placed in the element.
         */
        protected _targetType = 'bullet';

        /**
         * @name _targetTypeSet
         * @memberof platui.Radio
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the target type has been set already or not.
         */
        protected _targetTypeSet = true;
        
        /**
         * @name _removeListener
         * @memberof platui.Radio
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function to stop listening for dispatched group events.
         */
        protected _removeListener: plat.IRemoveListener;

        /**
         * @name setClasses
         * @memberof platui.Radio
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Radio + ' ' + (className || ''));
        }

        /**
         * @name loaded
         * @memberof platui.Radio
         * @kind function
         * @access public
         * 
         * @description
         * Checks for a radio group and converts "checked" attributes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var element = this.element;
            this._targetElement = this._targetElement || element.firstElementChild;
            this.addEventListener(element, __$tap, this._onTap);

            if (element.hasAttribute('name')) {
                this.groupName = element.getAttribute('name');
            } else if (element.hasAttribute(__Bind)) {
                this.groupName = element.getAttribute(__Bind);
            } else if (element.hasAttribute('data-' + __Bind)) {
                this.groupName = element.getAttribute('data-' + __Bind);
            }

            this._convertChecked();
        }

        /**
         * @name setProperty
         * @memberof platui.Radio
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * @param {boolean} setProperty? A boolean value indicating whether we should set 
         * the property if we need to toggle the check mark value.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any, setProperty?: boolean): void {
            if (newValue === oldValue) {
                return;
            }

            var isChecked = newValue === this._getValue(),
                wasChecked = this.isActive;

            if (isChecked === wasChecked) {
                return;
            }

            this._toggle(setProperty);
        }

        /**
         * @name propertyChanged
         * @memberof platui.Radio
         * @kind function
         * @access public
         * 
         * @description
         * Checks if the radio has been selected and only notifies of a bindable 
         * property changed if it has.
         * 
         * @param {any} newValue The new value of the property after the change.
         * @param {any} oldValue? The old value of the property prior to the change.
         * 
         * @returns {void}
         */
        propertyChanged(newValue: any, oldValue?: any): void {
            if (this.isActive) {
                super.propertyChanged(this._getValue());
            }
        }

        /**
         * @name _onTap
         * @memberof platui.Radio
         * @kind function
         * @access protected
         * 
         * @description
         * The callback for a tap event. Only fires the event if the {@link platui.Radio|Radio}  
         * has been selected.
         * 
         * @param {plat.ui.IGestureEvent} ev The tap event object.
         * 
         * @returns {void}
         */
        protected _onTap(ev: plat.ui.IGestureEvent): void {
            if (this.isActive) {
                return;
            }

            super._onTap(ev);
        }

        /**
         * @name _toggle
         * @memberof platui.Radio
         * @kind function
         * @access protected
         * 
         * @description
         * Toggles the mark and updates the bindable property if needed.
         * 
         * @param {boolean} setProperty? A boolean value stating whether the bindable 
         * property should be updated.
         * 
         * @returns {void}
         */
        protected _toggle(setProperty?: boolean): void {
            super._toggle(setProperty);
            if (this.$utils.isFunction(this._removeListener)) {
                this._removeListener();
                this._removeListener = null;
            }

            if (this.isActive) {
                var name = this.groupName;
                this.dispatchEvent(__RadioPrefix + name, plat.events.EventManager.DIRECT);
                var remover = this._removeListener = this.on(__RadioPrefix + name, () => {
                    this._toggle();
                    remover();
                });
            }
        }

        /**
         * @name _convertAttribute
         * @memberof platui.Radio
         * @kind function
         * @access protected
         * 
         * @description
         * A function for handling the attribute value conversion for updating the 
         * bound property.
         * 
         * @param {any} newValue The newValue of the attribute to convert.
         * @param {any} oldValue? The oldValue of the attribute to convert.
         * 
         * @returns {void}
         */
        protected _convertAttribute(newValue: any, oldValue?: any): void {
            var $utils = this.$utils;
            if ($utils.isBoolean(newValue)) {
                if (newValue) {
                    this.setProperty(this._getValue(), null, true);
                }
                return;
            } else if (!$utils.isString(newValue)) {
                return;
            }

            if (newValue === 'true') {
                this.setProperty(this._getValue(), null, true);
            }
        }

        /**
         * @name _getValue
         * @memberof platui.Radio
         * @kind function
         * @access protected
         * 
         * @description
         * Grabs the value of this {@link platui.Radio|Radio's} bindable property. It first checks for 
         * the "value" attribute, and defaults to the elements textContent if it's unavailable.
         * 
         * @returns {string} Returns the bindable value of this control.
         */
        protected _getValue(): string {
            var element = this.element;
            return element.hasAttribute('value') ? element.getAttribute('value').trim() : element.textContent.trim();
        }
    }

    plat.register.control(__Radio, Radio);

    /**
     * @name ProgressRing
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} for showing indeterminate progress.
     */
    export class ProgressRing extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name templateString
         * @memberof platui.ProgressRing
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-progress-container">' +
        '    <div class="plat-animated-ring"></div>' +
        '</div>';

        /**
         * @name setClasses
         * @memberof platui.ProgressRing
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __ProgressRing + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.ProgressRing
         * @kind function
         * @access public
         * 
         * @description
         * Set the animation.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }
    }

    plat.register.control(__ProgressRing, ProgressRing);

    /**
     * @name ProgressBar
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} for showing incremental progress.
     */
    export class ProgressBar extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.ProgressBar
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * @name templateString
         * @memberof platui.ProgressBar
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-progress-container">\n' +
        '    <div class="plat-animated-bar"></div>\n' +
        '</div>\n';

        /**
         * @name _barElement
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The animated bar element.
         */
        protected _barElement: HTMLElement;

        /**
         * @name _barMax
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The max value of the bar.
         */
        protected _barMax: number;

        /**
         * @name _cloneAttempts
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.ProgressBar
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _maxCloneAttempts = 25;

        /**
         * @name setClasses
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __ProgressBar + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name loaded
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Grabs the bar element and bar max value and checks to make sure the context is correctly 
         * set or a plat-bind is being used, then does the initial animation of the bar.
         * 
         * @returns {void}
         */
        loaded(): void {
            var context = this.context,
                barElement = this._barElement = <HTMLElement>this.element.firstElementChild.firstElementChild,
                bar = this._barMax = barElement.parentElement.offsetWidth;

            if (!bar) {
                this._setOffsetWithClone();
            }

            if (!this.$utils.isNumber(context) || context > 1 || context < 0) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1');
                return;
            }

            this.setProgress();
        }

        /**
         * @name contextChanged
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Animates the bar on a context changed.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            this.setProgress();
        }

        /**
         * @name setProgress
         * @memberof platui.ProgressBar
         * @kind function
         * @access public
         * 
         * @description
         * Sets the progress bar value.
         * 
         * @param {number} value? The decimal number between 0 and 1 to set as the 
         * bar percentage (e.g. - 0.5 would be 50% complete).
         * 
         * @returns {void}
         */
        setProgress(value?: number): void {
            var barValue = value || this.context;
            if (!this.$utils.isNumber(barValue) || barValue > 1 || barValue < 0) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('The context of a "' + this.type + '" control must be a number between 0 and 1');
                return;
            }

            this._barElement.style.width = Math.ceil(this._barMax * barValue) + 'px';
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.ProgressBar
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a clone of this element and uses it to find the max offset.
         * 
         * @returns {void}
         */
        protected _setOffsetWithClone(): void {
            var element = this.element,
                $document: Document = plat.acquire(__Document),
                body = $document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic),
                        type = this.type;
                    $exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' +
                        'DOM. Disposing of the ' + type);
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this.$utils.postpone(this._setOffsetWithClone, null, this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                regex = /\d+(?!\d+|%)/,
                $window: Window = plat.acquire(__Window),
                parentChain = <Array<HTMLElement>>[],
                shallowCopy = clone,
                computedStyle: CSSStyleDeclaration,
                width: string;

            shallowCopy.id = '';
            while (!regex.test((width = (computedStyle = $window.getComputedStyle(element)).width))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty('width', width, 'important');
                element = element.parentElement;
                shallowCopy = <HTMLElement>element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }

            if (parentChain.length > 0) {
                var curr = parentChain.pop(),
                    currStyle = curr.style,
                    temp: HTMLElement;

                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }

                curr.insertBefore(clone, null);
            }

            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty('width', width, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._barMax = (<HTMLElement>clone.firstElementChild).offsetWidth;
            body.removeChild(shallowCopy);
        }
    }

    plat.register.control(__ProgressBar, ProgressBar);

    /**
     * @name Drawer
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that acts as a global drawer.
     */
    export class Drawer extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * @name options
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IDrawerOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IDrawerOptions>;

        /**
         * @name _currentPosition
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The current position of the {@link platui.Drawer|Drawer}.
         */
        protected _currentPosition: string;
        /**
         * @name _useContext
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to use the inherited context of this global {@link platui.Drawer|Drawer}.
         */
        protected _useContext: boolean;

        /**
         * @name controller
         * @memberof platui.Drawer
         * @kind property
         * @access public
         * 
         * @type {platui.DrawerController}
         * 
         * @description
         * A reference to all the {@link platui.DrawerController|DrawerController} used to control this {@link platui.Drawer|Drawer}.
         */
        protected _controllers: Array<DrawerController> = [];

        /**
         * @name _loaded
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control has been loaded.
         */
        protected _loaded = false;

        /**
         * @name _preloadedValue
         * @memberof platui.Drawer
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specified prior to the control being loaded.
         */
        protected _preloadedValue = false;

        /**
         * @name setClasses
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Drawer + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name and hides the element and 
         * removes the innerHTML from the DOM and saves it.
         * 
         * @returns {void}
         */
        initialize(): void {
            var childNodes = Array.prototype.slice.call(this.element.childNodes);
            if (childNodes.length > 0) {
                this.innerTemplate = this.dom.appendChildren(childNodes);
            }
            this.setClasses();
        }

        /**
         * @name loaded
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Check for a position and initialize event handling.
         * 
         * @returns {void}
         */
        loaded(): void {
            var element = this.element,
                $utils = this.$utils,
                optionObj = this.options || <plat.observable.IObservableProperty<IDrawerOptions>>{},
                options = optionObj.value || <IDrawerOptions>{},
                position = this._currentPosition = options.position || 'left',
                useContext = this._useContext = (options.useContext === true) || !$utils.isUndefined(this.attributes[__CamelContext]),
                id = options.id || '',
                templateUrl = options.templateUrl,
                isElastic = options.elastic === true;

            element.setAttribute(__Hide, '');
            this.dom.addClass(element, __Plat + position);

            if ($utils.isString(templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, templateUrl).then((template) => {
                    this.innerTemplate = template;
                    if (this._useContext) {
                        this.bindTemplate('drawer', template.cloneNode(true));
                        this._checkPreload();
                    }

                    this._initializeEvents(id, position, isElastic);
                });
                return;
            } else if (useContext && $utils.isNode(this.innerTemplate)) {
                this.bindTemplate('drawer', this.innerTemplate.cloneNode(true));
                this._checkPreload();
            }

            this._initializeEvents(id, position, isElastic);
        }

        /**
         * @name open
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        open(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this.$utils.isNull(controller)) {
                var $promise: plat.async.IPromise = plat.acquire(__Promise),
                    $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to open.', $exception.TEMPLATE);
                return $promise.resolve(null);
            }

            return controller.open();
        }

        /**
         * @name close
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        close(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this.$utils.isNull(controller)) {
                var $promise: plat.async.IPromise = plat.acquire(__Promise),
                    $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to close.', $exception.TEMPLATE);
                return $promise.resolve(null);
            }

            return controller.close();
        }

        /**
         * @name toggle
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Toggles the {@link platui.Drawer|Drawer's} open/closed state.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is toggled and the animation is complete.
         */
        toggle(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this.$utils.isNull(controller)) {
                var $promise: plat.async.IPromise = plat.acquire(__Promise),
                    $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to toggle.', $exception.TEMPLATE);
                return $promise.resolve(null);
            }

            return controller.toggle();
        }

        /**
         * @name reset
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Resets the {@link platui.Drawer|Drawer} to it's current open/closed state.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is reset and the animation is complete.
         */
        reset(): plat.async.IThenable<void> {
            var controller = this._controllers[0];
            if (this.$utils.isNull(controller)) {
                var $promise: plat.async.IPromise = plat.acquire(__Promise),
                    $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to reset.', $exception.TEMPLATE);
                return $promise.resolve(null);
            }

            return controller.reset();
        }

        /**
         * @name isOpen
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Indicates whether the {@link platui.Drawer|Drawer} is currently open.
         * 
         * @returns {boolean} Whether or not the {@link platui.Drawer|Drawer} is currently open.
         */
        isOpen(): boolean {
            var controller = this._controllers[0];
            if (this.$utils.isNull(controller)) {
                var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                $exception.warn('No controller, such as a ' + __DrawerController + ', found for the ' +
                    this.type + ' attempting to check if open.', $exception.TEMPLATE);
                return false;
            }

            return controller.isOpen();
        }

        /**
         * @name bindTemplate
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Adds and binds the added HTML template to this control's inherited context.
         * 
         * @param {string} name The template name to both add and bind.
         * @param {Node} node The node to add as a bindable template.
         * 
         * @returns {void}
         */
        bindTemplate(name: string, node: Node): void {
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            bindableTemplates.bind(name).then((template) => {
                var element = this.element;
                this.dom.clearNode(element);
                element.appendChild(template);
            });
        }

        /**
         * @name setProperty
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any): void {
            if (!this.loaded) {
                this._preloadedValue = newValue;
                return;
            }

            var $utils = this.$utils,
                controller = this._controllers[0];

            if ($utils.isBoolean(newValue) && !$utils.isNull(controller)) {
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
        }

        /**
         * @name controllerCount
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Returns the number of {@link platui.DrawerController|DrawerControllers} linked to this 
         * {@link platui.Drawer|Drawer}.
         * 
         * @returns {number} The {@link platui.DrawerController|DrawerController} count.
         */
        controllerCount(): number {
            return this._controllers.length;
        }

        /**
         * @name spliceController
         * @memberof platui.Drawer
         * @kind function
         * @access public
         * 
         * @description
         * Removes a specified {@link platui.DrawerController|DrawerController} from this control's Array of 
         * linked {@link platui.DrawerController|DrawerControllers}.
         * 
         * @param {platui.DrawerController} controller The {@link platui.DrawerController|DrawerController} 
         * to splice.
         * 
         * @returns {void}
         */
        spliceController(controller: DrawerController): void {
            var controllers = this._controllers,
                index = controllers.indexOf(controller);
            if (index === -1) {
                return;
            }

            controllers.splice(index, 1);
        }

        /**
         * @name _changeDirection
         * @memberof platui.Drawer
         * @kind function
         * @access protected
         * 
         * @description
         * Changes the placement and implied position of the {@link platui.Drawer|Drawer}.
         * 
         * @param {string} position The new position to change to.
         * 
         * @returns {void}
         */
        protected _changeDirection(position: string): void {
            if (this.$utils.isNull(position) || position === this._currentPosition) {
                return;
            }

            var dom = this.dom,
                element = this.element;

            dom.removeClass(element, __Plat + this._currentPosition);
            dom.addClass(element, __Plat + position);

            this._currentPosition = position;
        }

        /**
         * @name _initializeEvents
         * @memberof platui.Drawer
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes and dispatches pub sub events.
         * 
         * @param {string} id The ID of this {@link platui.Drawer|Drawer} if used.
         * @param {string} position The position.
         * @param {boolean} isElastic Whether or not the {@link platui.Drawer|Drawer} has an 
         * elastic transition effect.
         * 
         * @returns {void}
         */
        protected _initializeEvents(id: string, position: string, isElastic: boolean): void {
            var $utils = this.$utils,
                isString = $utils.isString,
                isNull = $utils.isNull,
                innerTemplate = this.innerTemplate,
                useContext = this._useContext,
                DIRECT = plat.events.EventManager.DIRECT;

            this.on(__DrawerControllerFetchEvent + '_' + id,
                (event: plat.events.IDispatchEventInstance, controllerArg: IDrawerHandshakeEvent) => {
                    var control = controllerArg.control;
                    if (isNull(control)) {
                        return;
                    }

                    if (isString(controllerArg.position)) {
                        position = controllerArg.position;
                        this._changeDirection(position);
                    }

                    this._controllers.unshift(control);

                    if (!controllerArg.received) {
                        this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                            control: this,
                            received: true,
                            position: position,
                            useContext: useContext,
                            template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                            elastic: isElastic
                        });
                    }
                });

            this.dispatchEvent(__DrawerFoundEvent + '_' + id, DIRECT, {
                control: this,
                received: false,
                position: position,
                useContext: useContext,
                template: $utils.isNode(innerTemplate) ? innerTemplate.cloneNode(true) : null,
                elastic: isElastic
            });
        }

        /**
         * @name _checkPreload
         * @memberof platui.Drawer
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the preloaded value and handles accordingly.
         * 
         * @returns {void}
         */
        protected _checkPreload(): void {
            if (this._preloadedValue) {
                var $utils = this.$utils;
                $utils.postpone(() => {
                    var controller = this._controllers[0];
                    if (!$utils.isNull(controller)) {
                        controller.open();
                    }
                });
            }
        }
    }

    plat.register.control(__Drawer, Drawer);

    /**
     * @name DrawerController
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that manipulates and controls a global drawer.
     */
    export class DrawerController extends plat.ui.BindablePropertyControl {
        /**
         * @name $utils
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        /**
         * @name $compat
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $compat: plat.ICompat = plat.acquire(__Compat);
        /**
         * @name $window
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $window: Window = plat.acquire(__Window);
        /**
         * @name $document
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);
        /**
         * @name $animator
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);
        /**
         * @name $Promise
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.async.IPromise}
         * 
         * @description
         * Reference to the {@link plat.async.IPromise|IPromise} injectable.
         */
        $Promise: plat.async.IPromise = plat.acquire(__Promise);

        /**
         * @name options
         * @memberof platui.DrawerController
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IDrawerOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IDrawerControllerOptions>;

        /**
         * @name _position
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The position of the global {@link platui.Drawer|Drawer} associated 
         * with this control.
         */
        protected _position: string;

        /**
         * @name _drawerElement
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement of the global {@link platui.Drawer|Drawer} associated 
         * with this control.
         */
        protected _drawerElement: HTMLElement;

        /**
         * @name _drawer
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {platui.Drawer}
         * 
         * @description
         * The global {@link platui.Drawer|Drawer} associated 
         * with this control.
         */
        protected _drawer: Drawer;

        /**
         * @name _transform
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The current browser's CSS3 transform property.
         */
        protected _transform: string;

        /**
         * @name _preTransform
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The value of the inline transform property prior to the Drawer manipulating it.
         */
        protected _preTransform: string;

        /**
         * @name _lastTouch
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        protected _lastTouch: plat.ui.IPoint;

        /**
         * @name _hasSwiped
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user has swiped.
         */
        protected _hasSwiped = false;

        /**
         * @name _hasTapped
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user has tapped.
         */
        protected _hasTapped = false;

        /**
         * @name _isOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is open.
         */
        protected _isOpen = false;

        /**
         * @name _isElastic
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link platui.Drawer|Drawer} is elastic.
         */
        protected _isElastic: boolean;

        /**
         * @name _inTouch
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently touching the screen.
         */
        protected _inTouch: boolean;

        /**
         * @name _useContext
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not to use this control's inherited context.
         */
        protected _useContext: boolean;

        /**
         * @name _maxOffset
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The max offset to transform the {@link platui.Drawer|Drawer's} element.
         */
        protected _maxOffset: number;

        /**
         * @name _removeTap
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the tap event listener.
         */
        protected _removeTap: plat.IRemoveListener;

        /**
         * @name _removeSwipeOpen
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe open event listener.
         */
        protected _removeSwipeOpen: plat.IRemoveListener;

        /**
         * @name _removePrimaryTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the primary track (open) event listener.
         */
        protected _removePrimaryTrack: plat.IRemoveListener;

        /**
         * @name _removeSecondaryTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the secondary track (close) event listener.
         */
        protected _removeSecondaryTrack: plat.IRemoveListener;

        /**
         * @name _openTapRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the tap event listener on the open {@link platui.Drawer|Drawer}.
         */
        protected _openTapRemover: plat.IRemoveListener;

        /**
         * @name _openSwipeRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe event listeners on the open {@link platui.Drawer|Drawer}.
         */
        protected _openSwipeRemover: plat.IRemoveListener;

        /**
         * @name _openTrackRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the swipe event listeners on the open {@link platui.Drawer|Drawer}.
         */
        protected _openTrackRemover: plat.IRemoveListener;

        /**
         * @name _disposeRemover
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function for removing the listener for responding to other {@link platui.DrawerController|DrawerControllers} 
         * being disposed.
         */
        protected _disposeRemover: plat.IRemoveListener = () => { };

        /**
         * @name _rootElement
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The root element to translate.
         */
        protected _rootElement: HTMLElement;

        /**
         * @name _rootElementStyle
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {{ position?: string; zIndex?: string; }}
         * 
         * @description
         * An object to hold the _rootElement style so that we can reset it 
         * when the {@link platui.DrawerController|Drawer Controller} is disposed.
         */
        protected _rootElementStyle: { position?: string; zIndex?: string; };

        /**
         * @name _type
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The type of {@link platui.Drawer|Drawer} 
         * (i.e. the method by which the {@link platui.Drawer|Drawer} opens and closes).
         */
        protected _type: string;

        /**
         * @name _templateUrl
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A URL that points to the HTML template.
         */
        protected _templateUrl: string;

        /**
         * @name _directionalTransitionPrep
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A class name that is used to set styling based on the transition direction.
         */
        protected _directionalTransitionPrep: string;

        /**
         * @name _loaded
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control has been loaded.
         */
        protected _loaded = false;

        /**
         * @name _preloadedValue
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specified prior to the control being loaded.
         */
        protected _preloadedValue = false;

        /**
         * @name _isTap
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is waiting for a tap 
         * for opening and closing.
         */
        protected _isTap: boolean;

        /**
         * @name _isSwipe
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is waiting for a swipe 
         * for opening and closing.
         */
        protected _isSwipe: boolean;

        /**
         * @name _isTrack
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specifying whether the {@link platui.Drawer|Drawer} is being tracked 
         * for opening and closing.
         */
        protected _isTrack: boolean;

        /**
         * @name _toggleDelay
         * @memberof platui.DrawerController
         * @kind property
         * @access protected
         * 
         * @type {plat.IRemoveListener}
         * 
         * @description
         * A function to remove the toggle delay if present.
         */
        protected _toggleDelay: plat.IRemoveListener;

        /**
         * @name initialize
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Sets the class name on the element.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.dom.addClass(this.element, __DrawerController);
        }

        /**
         * @name loaded
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Initialize the track events on the element.
         * 
         * @returns {void}
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IDrawerControllerOptions>>{},
                options = optionObj.value || <IDrawerControllerOptions>{},
                position = options.position,
                id = options.id || '';

            this._type = options.type || 'tap track';
            this._isElastic = options.elastic;
            this._useContext = options.useContext;
            this._templateUrl = options.templateUrl;
            this._initializeEvents(id, position);
        }

        /**
         * @name dispose
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Remove the transition classes off the root element and reset the position and 
         * zIndex properties if modified and only if this is the last {@link platui.DrawerController|DrawerController}  
         * referencing this {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        dispose(): void {
            var $utils = this.$utils,
                drawer = this._drawer;
            if ($utils.isNull(drawer)) {
                return;
            }

            drawer.spliceController(this);
            if (drawer.controllerCount() > 0) {
                return;
            }

            var storedStyle = this._rootElementStyle,
                rootElement = this._rootElement,
                disposeRootElement = true;

            this._disposeRemover();
            this.on(__DrawerControllerDisposingFound, (ev: plat.events.IDispatchEventInstance, otherRoot: HTMLElement) => {
                if (!disposeRootElement) {
                    return;
                }

                disposeRootElement = rootElement !== otherRoot;
            });

            $utils.defer(() => {
                if (!disposeRootElement) {
                    return;
                }

                this.dom.removeClass(rootElement, __Drawer + '-open plat-drawer-transition-prep ' + this._directionalTransitionPrep);

                if ($utils.isObject(storedStyle)) {
                    var rootElementStyle = this._rootElement.style;
                    $utils.extend(rootElementStyle, storedStyle);
                }
            }, 25);

            this.dispatchEvent(__DrawerControllerDisposing, plat.events.EventManager.DIRECT);
        }

        /**
         * @name open
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        open(): plat.async.IThenable<void> {
            var wasClosed = !this._isOpen,
                $utils = this.$utils;

            if ($utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }

            var promise = new this.$Promise<void>((resolve) => {
                this._toggleDelay = $utils.postpone(() => {
                    this._toggleDelay = null;
                    this._open().then(resolve);
                });
            });

            if (wasClosed) {
                if (this._useContext) {
                    this.propertyChanged(true);
                } else if (!$utils.isNull(this._drawer)) {
                    this._drawer.propertyChanged(true);
                }
            }

            return promise;
        }

        /**
         * @name close
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        close(): plat.async.IThenable<void> {
            var wasOpen = this._isOpen,
                $utils = this.$utils;

            if ($utils.isFunction(this._toggleDelay)) {
                this._toggleDelay();
            }

            var promise = new this.$Promise<void>((resolve) => {
                this._toggleDelay = $utils.postpone(() => {
                    this._toggleDelay = null;
                    this._close().then(resolve);
                });
            });

            if (wasOpen) {
                if (this._useContext) {
                    this.propertyChanged(false);
                } else if (!$utils.isNull(this._drawer)) {
                    this._drawer.propertyChanged(false);
                }
            }

            return promise;
        }

        /**
         * @name toggle
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Toggles the {@link platui.Drawer|Drawer's} open/closed state.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is toggled and the animation is complete.
         */
        toggle(): plat.async.IThenable<void> {
            if (this._isOpen) {
                return this.close();
            }

            return this.open();
        }

        /**
         * @name reset
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Resets the {@link platui.Drawer|Drawer} to it's current open/closed state.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer's} state is reset and the animation is complete.
         */
        reset(): plat.async.IThenable<void> {
            if (this._isOpen) {
                return this.open();
            }

            return this.close();
        }

        /**
         * @name isOpen
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Indicates whether the {@link platui.Drawer|Drawer} is currently open.
         * 
         * @returns {boolean} Whether or not the {@link platui.Drawer|Drawer} is currently open.
         */
        isOpen(): boolean {
            return this._isOpen;
        }

        /**
         * @name bindTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access public
         * 
         * @description
         * Binds the added HTML template to this control's inherited context and 
         * places the node into the {@link platui.Drawer|Drawer}.
         * 
         * @param {string} name The template name to bind.
         * @param {Node} node The node to add as a bindable template.
         * 
         * @returns {void}
         */
        bindTemplate(name: string, node: Node): void {
            var bindableTemplates = this.bindableTemplates;
            bindableTemplates.add(name, node);
            bindableTemplates.bind(name).then((template) => {
                var element = this._drawerElement;
                this.dom.clearNode(element);
                element.appendChild(template);
            });
        }

        /**
         * @name setProperty
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any): void {
            if (!this.loaded) {
                this._preloadedValue = newValue;
                return;
            }

            var $utils = this.$utils;
            if ($utils.isBoolean(newValue)) {
                if (newValue) {
                    if (this._isOpen) {
                        return;
                    }
                    this._toggleDelay = $utils.postpone(() => {
                        this._toggleDelay = null;
                        this._open();
                    });
                    return;
                }

                if (this._isOpen) {
                    this._toggleDelay = $utils.postpone(() => {
                        this._toggleDelay = null;
                        this._close();
                    });
                }
            }
        }

        /**
         * @name _open
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Opens the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is open and the animation is complete.
         */
        protected _open(): plat.async.IThenable<void> {
            var rootElement = this._rootElement,
                drawerElement = this._drawerElement,
                $utils = this.$utils,
                isNode = $utils.isNode,
                wasClosed = !this._isOpen;

            if (!(isNode(rootElement) && isNode(drawerElement))) {
                return this.$Promise.resolve(null);
            }

            var translation: string;
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
                    return <any>this.$animator.resolve();
            }

            this._isOpen = true;

            drawerElement.removeAttribute(__Hide);

            if (wasClosed) {
                this.dom.addClass(rootElement, __Drawer + '-open ' + this._directionalTransitionPrep);
                this._addEventIntercepts();
            } else {
                this.dom.addClass(rootElement, this._directionalTransitionPrep);
            }

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = translation;
            return <any>this.$animator.animate(rootElement, __Transition, {
                properties: animationOptions
            });
        }

        /**
         * @name _close
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Closes the {@link platui.Drawer|Drawer}.
         * 
         * @returns {plat.async.IThenable<void>} A promise that resolves 
         * when the {@link platui.Drawer|Drawer} is closed and the animation is complete.
         */
        protected _close(): plat.async.IThenable<void> {
            var rootElement = this._rootElement,
                drawerElement = this._drawerElement,
                dom = this.dom,
                $utils = this.$utils,
                isNode = $utils.isNode;

            if (this._isOpen) {
                this._removeEventIntercepts();
                dom.removeClass(rootElement, __Drawer + '-open');
            }

            this._isOpen = false;

            if (!(isNode(rootElement) && isNode(drawerElement))) {
                return this.$Promise.resolve(null);
            }

            var animationOptions: plat.IObject<string> = {},
                transform = <any>this._transform;

            animationOptions[transform] = this._preTransform;
            return this.$animator.animate(rootElement, __Transition, {
                properties: animationOptions
            }).then(() => {
                if (this._isOpen) {
                    return;
                }

                drawerElement.setAttribute(__Hide, '');
                dom.removeClass(rootElement, this._directionalTransitionPrep);
            });
        }

        /**
         * @name _addEventIntercepts
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners to the moving root element when tracking and closing an open {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _addEventIntercepts(): void {
            if (this._isTap) {
                this._addTapClose();
            }

            if (this._isSwipe) {
                this._addSwipeClose();
            }

            if (this._isTrack) {
                var rootElement = this._rootElement;
                var touchStartRemover = this.addEventListener(rootElement, __$touchstart, this._touchStart, false),
                    trackRemover = this.addEventListener(rootElement, __$track, this._track, false),
                    touchEnd = this._touchEnd,
                    trackEndRemover = this.addEventListener(rootElement, __$trackend, touchEnd, false),
                    touchEndRemover = this.addEventListener(rootElement, __$touchend, touchEnd, false);

                this._openTrackRemover = () => {
                    touchStartRemover();
                    trackRemover();
                    trackEndRemover();
                    touchEndRemover();
                };
            }
        }

        /**
         * @name _removeEventIntercepts
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Removes all event intercepts on the moving root element when closing an open {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _removeEventIntercepts(): void {
            var isFunction = this.$utils.isFunction;

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
        }

        /**
         * @name _addSwipeOpen
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds swipe events to the controller element.
         * 
         * @returns {void}
         */
        protected _addSwipeOpen(): void {
            this._removeSwipeOpen = this.addEventListener(this.element, __$swipe + __transitionNegate[this._position], () => {
                this._hasSwiped = true;
                this.open();
            }, false);
        }

        /**
         * @name _addSwipeClose
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds swipe close event to the root element.
         * 
         * @returns {void}
         */
        protected _addSwipeClose(): void {
            this._openSwipeRemover = this.addEventListener(this._rootElement, __$swipe + this._position, () => {
                this._hasSwiped = true;
                this.close();
            }, false);
        }

        /**
         * @name _addTapOpen
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds tap close event to the controller element.
         * 
         * @returns {void}
         */
        protected _addTapOpen(): void {
            this._removeTap = this.addEventListener(this.element, __$tap, () => {
                this._hasTapped = true;
                this.open();
            }, false);
        }

        /**
         * @name _addTapClose
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds tap close event to the root element.
         * 
         * @returns {void}
         */
        protected _addTapClose(): void {
            this._openTapRemover = this.addEventListener(this._rootElement, __$tap, () => {
                this._hasTapped = true;
                this.close();
            }, false);
        }

        /**
         * @name _addEventListeners
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Adds primary and secondary tracking events to the {@link platui.DrawerController|DrawerController} element.
         * 
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _addEventListeners(position: string): void {
            var element = this.element,
                isNull = this.$utils.isNull,
                types = this._type.split(' ');

            this._position = position;

            // remove event listeners here first if we want to later be able to dynamically change position of drawer.
            // this._removeEventListeners();

            if (this._isTap = (types.indexOf('tap') !== -1)) {
                this._addTapOpen();
            }

            if (this._isSwipe = (types.indexOf('swipe') !== -1)) {
                this._addSwipeOpen();
            }

            if (this._isTrack = (types.indexOf('track') !== -1)) {
                var trackFn = this._track,
                    trackDirection: string;

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
                        var Exception = plat.acquire(plat.IExceptionStatic);
                        Exception.warn('Incorrect position: "' + position +
                            '" defined for the drawer control, such as "' +
                            __Drawer + '", or "' + this.type + '."');
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
        }

        /**
         * @name _removeEventListeners
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Removes all event listeners.
         * 
         * @returns {void}
         */
        protected _removeEventListeners(): void {
            var isFunction = this.$utils.isFunction;

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
        }

        /**
         * @name _touchStart
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Log when the user touches the {@link platui.DrawerController|DrawerController}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };

            if (this._isOpen) {
                return;
            }

            this._drawerElement.removeAttribute(__Hide);
            this.dom.addClass(this._rootElement, this._directionalTransitionPrep);
        }

        /**
         * @name _touchEnd
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * The $touchend and $trackend event handler.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void {
            var inTouch = this._inTouch,
                hasSwiped = this._hasSwiped,
                hasTapped = this._hasTapped;

            this._inTouch = this._hasSwiped = this._hasTapped = false;
            if (hasTapped || !inTouch || hasSwiped) {
                return;
            }

            var distanceMoved: number;
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

            if (this._isRightDirection(distanceMoved) &&
                Math.abs(distanceMoved) > Math.ceil(this._maxOffset / 2)) {
                this.$utils.postpone(this.toggle, null, this);
                return;
            }

            this.$utils.postpone(this.reset, null, this);
        }

        /**
         * @name _track
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined position.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {void}
         */
        protected _track(ev: plat.ui.IGestureEvent): void {
            this._rootElement.style[<any>this._transform] = this._calculateTranslation(ev);
        }

        /**
         * @name _isRightDirection
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Checks to make sure the user has been tracking in the right direction to 
         * toggle.
         * 
         * @param {number} distanceMoved The distance the user's pointer has moved.
         * 
         * @returns {boolean} Whether or not the user was tracking in the right direction.
         */
        protected _isRightDirection(distanceMoved: number): boolean {
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
        }

        /**
         * @name _calculateTranslation
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the translation value for setting the transform value.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {string} The translation value.
         */
        protected _calculateTranslation(ev: plat.ui.IGestureEvent): string {
            var distanceMoved: number;
            switch (this._position) {
                case 'left':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + ev.clientX - this._lastTouch.x) :
                    this._checkElasticity(ev.clientX - this._lastTouch.x);
                    return 'translate3d(' + distanceMoved + 'px,0,0)';
                case 'right':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + this._lastTouch.x - ev.clientX) :
                    this._checkElasticity(this._lastTouch.x - ev.clientX);
                    return 'translate3d(' + (-distanceMoved) + 'px,0,0)';
                case 'top':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + ev.clientY - this._lastTouch.y) :
                    this._checkElasticity(ev.clientY - this._lastTouch.y);
                    return 'translate3d(0,' + distanceMoved + 'px,0)';
                case 'bottom':
                    distanceMoved = this._isOpen ?
                    this._checkElasticity(this._maxOffset + this._lastTouch.y - ev.clientY) :
                    this._checkElasticity(this._lastTouch.y - ev.clientY);
                    return 'translate3d(0,' + (-distanceMoved) + 'px,0)';
                default:
                    return this._preTransform;
            }
        }

        /**
         * @name _checkElasticity
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Checks for elasticity and potentially readjusts the user's 
         * distance moved.
         * 
         * @param {number} distanceMoved The distance the user's finger moved.
         * 
         * @returns {number} The potentially recalcuated distance moved.
         */
        protected _checkElasticity(distanceMoved: number): number {
            if (this._isElastic) {
                return distanceMoved;
            }

            if (distanceMoved < 0) {
                distanceMoved = 0;
            } else if (distanceMoved > this._maxOffset) {
                distanceMoved = this._maxOffset;
            }

            return distanceMoved;
        }

        /**
         * @name _initializeEvents
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes and dispatches pub sub events.
         * 
         * @param {string} id The ID of this {@link platui.DrawerController|DrawerController} if used.
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        protected _initializeEvents(id: string, position: string): void {
            this._setTransform();

            var eventRemover = this.on(__DrawerFoundEvent + '_' + id,
                (event: plat.events.IDispatchEventInstance, drawerArg: IDrawerHandshakeEvent) => {
                    eventRemover();

                    var $utils = this.$utils,
                        isString = $utils.isString,
                        isUndefined = $utils.isUndefined,
                        drawer = (this._drawer = drawerArg.control) || {},
                        drawerElement = this._drawerElement = drawer.element,
                        useContext = this._useContext;

                    if (!isString(position)) {
                        if (isString(drawerArg.position)) {
                            position = drawerArg.position;
                        } else {
                            var Exception = plat.acquire(plat.IExceptionStatic);
                            Exception.warn('"position" is incorrectly defined for the drawer control, such as "' +
                                __Drawer + '" or "' + this.type + '."' +
                                ' Please ensure it is a string.');
                            return;
                        }
                    }

                    if (!this._controllerIsValid(position)) {
                        return;
                    }

                    drawerElement.removeAttribute(__Hide);
                    this._addEventListeners(position.toLowerCase());
                    this._setOffset();
                    drawerElement.setAttribute(__Hide, '');

                    if (isUndefined(this._isElastic)) {
                        this._isElastic = drawerArg.elastic === true;
                    }

                    if (!drawerArg.received) {
                        this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                            control: this,
                            received: true,
                            position: position
                        });
                    }

                    if (useContext === false || (isUndefined(useContext) && drawerArg.useContext === true)) {
                        return;
                    }

                    this._useContext = true;
                    this._determineTemplate(drawerArg.template);

                    if (this._preloadedValue) {
                        this._toggleDelay = $utils.postpone(() => {
                            this._toggleDelay = null;
                            this._open();
                        });
                    }
                });

            this.dispatchEvent(__DrawerControllerFetchEvent + '_' + id, plat.events.EventManager.DIRECT, {
                control: this,
                received: false,
                position: position
            });
        }

        /**
         * @name _determineTemplate
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Determines the proper HTML template, binds it, and inserts it if needed.
         * 
         * @param {Node} fragment? A Node to insert as the {@link platui.Drawer|Drawer's} HTML template 
         * if no templateUrl is present on this {@link platui.DrawerController|DrawerController}.
         * 
         * @returns {void}
         */
        protected _determineTemplate(fragment?: Node): void {
            var $utils = this.$utils;

            if ($utils.isString(this._templateUrl)) {
                plat.ui.TemplateControl.determineTemplate(this, this._templateUrl).then((template) => {
                    this.bindTemplate('drawer', template);
                });
            } else if ($utils.isNode(fragment)) {
                this.bindTemplate('drawer', fragment);
            }
        }

        /**
         * @name _setTransform
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the current browser's transform property value.
         * 
         * @returns {void}
         */
        protected _setTransform(): void {
            var style = this.element.style,
                isUndefined = this.$utils.isUndefined,
                transform: string;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this.$compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                } else if (!isUndefined(style[<any>(vendorPrefix.js + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                }
            } else {
                transform = this._transform = 'transform';
            }

            this._preTransform = style[<any>transform];
        }

        /**
         * @name _controllerIsValid
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Checks if this control has all valid properties.
         * 
         * @param {string} position The position of the {@link platui.Drawer|Drawer}.
         * 
         * @returns {boolean} Whether or not this control is valid.
         */
        protected _controllerIsValid(position: string): boolean {
            var isNull = this.$utils.isNull,
                Exception: plat.IExceptionStatic;

            if (isNull(this._drawerElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Could not find a corresponding drawer control, such as "' + __Drawer +
                    '" for this "' + this.type + '."');
                return false;
            }

            var rootElement = this._rootElement = this._getRootElement(this.root);
            if (isNull(rootElement)) {
                Exception = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Cannot have a "' + this.type +
                    '" in a hierarchy above the corresponding drawer control, such as "' + __Drawer + '."');
                return false;
            }

            var dom = this.dom,
                transitionPrep = 'plat-drawer-transition-prep';
            if (!dom.hasClass(rootElement, transitionPrep)) {
                dom.addClass(rootElement, transitionPrep);
            }

            this._directionalTransitionPrep = 'plat-drawer-transition-' + position;

            this._disposeRemover = this.on(__DrawerControllerDisposing, () => {
                this.dispatchEvent(__DrawerControllerDisposingFound, plat.events.EventManager.DIRECT, rootElement);
            });

            return true;
        }

        /**
         * @name _getRootElement
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the root element to translate.
         * 
         * @param {plat.ui.ITemplateControl} root The control to start searching at.
         * 
         * @returns {HTMLElement} The root element.
         */
        protected _getRootElement(root: plat.ui.ITemplateControl): HTMLElement {
            var $utils = this.$utils,
                isNode = $utils.isNode;
            if (!$utils.isObject(root)) {
                return null;
            }

            var element = root.element,
                drawer = this._drawerElement,
                parent: HTMLElement;
            while (isNode(element) && !((parent = element.parentElement).contains(drawer))) {
                element = parent;
            }

            var $window = this.$window,
                computedStyle = $window.getComputedStyle(element),
                style = element.style,
                position = computedStyle.position,
                zIndex = Number(computedStyle.zIndex),
                rootElementStyle: { position?: string; zIndex?: string; };

            if (position === 'static') {
                rootElementStyle = {
                    position: style.position
                };
                style.position = 'relative';
            }

            if (!$utils.isNumber(zIndex) || zIndex < 1) {
                rootElementStyle = rootElementStyle || {};
                rootElementStyle.zIndex = style.zIndex;
                style.zIndex = '1';
            }

            this._rootElementStyle = rootElementStyle;

            return element;
        }

        /**
         * @name _setOffset
         * @memberof platui.DrawerController
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the max offset to translate the {@link platui.Drawer|Drawer}.
         * 
         * @returns {void}
         */
        private _setOffset(): void {
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
                    return;
            }
        }
    }

    plat.register.control(__DrawerController, DrawerController);

    /**
     * @name IDrawerOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Drawer|Drawer} control.
     */
    export interface IDrawerOptions {
        /**
         * @name id
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The unique ID of the {@link platui.Drawer|Drawer} / {@link platui.DrawerController|DrawerController} pair.
         */
        id?: string;

        /**
         * @name position
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The position of the {@link platui.Drawer|Drawer}. 
         * Defaults to "left".
         * 
         * @remarks
         * - "left"
         * - "right"
         * - "top"
         * - "bottom"
         */
        position?: string;

        /**
         * @name templateUrl
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The URL of the {@link platui.Drawer|Drawer's} intended template.
         */
        templateUrl?: string;

        /**
         * @name useContext
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value stating whether to use the associated control's context or not.
         */
        useContext?: boolean;

        /**
         * @name elastic
         * @memberof platui.IDrawerOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the {@link platui.Drawer|Drawer} has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;
    }

    /**
     * @name IDrawerControllerOptions
     * @memberof platui
     * @kind interface
     * 
     * @extends {platui.IDrawerOptions}
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.DrawerController|DrawerController} control.
     */
    export interface IDrawerControllerOptions extends IDrawerOptions {
        /**
         * @name type
         * @memberof platui.IDrawerControllerOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Specifies how the {@link platui.Drawer|Drawer} should open. Multiple types can be combined by making it space delimited. 
         * It's default behavior is "tap track".
         * 
         * @remarks
         * "tap": The drawer opens when the controller is tapped.
         * "track": The drawer opens when the controller is dragged.
         * "swipe": The drawer opens when the controller is swiped.
         * default: The drawer opens either when the controller is tapped or the 
         * controller is tracked.
         */
        type?: string;
    }

    /**
     * @name IDrawerHandshakeEvent
     * @memberof platui
     * @kind interface
     * @exported false
     * 
     * @description
     * An interface for the {@link platui.Drawer|Drawer's} event object used during the 
     * {@link platui.Drawer|Drawer} / {@link platui.DrawerController|DrawerController} handshake.
     */
    interface IDrawerHandshakeEvent {
        /**
         * @name received
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value specifying whether the handshake is being reciprocated.
         */
        received?: boolean;
        /**
         * @name control
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {any}
         * 
         * @description
         * A reference to either the corresponding {@link platui.DrawerController|DrawerController} or the corresponding 
         * {@link platui.Drawer|Drawer} the  used to control the {@link platui.Drawer|Drawer}.
         */
        control?: any;
        /**
         * @name position
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The position of the {@link platui.Drawer|Drawer}. 
         */
        position?: string;
        /**
         * @name template
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {Node}
         * 
         * @description
         * The intended template of the global {@link platui.Drawer|Drawer} element.
         */
        template?: Node;
        /**
         * @name useContext
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value stating whether to use the associated control's context or not.
         */
        useContext?: boolean;
        /**
         * @name elastic
         * @memberof platui.IDrawerHandshakeEvent
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the {@link platui.Drawer|Drawer} has an elastic effect while sliding. 
         * Defaults to false.
         */
        elastic?: boolean;
    }

    /**
     * @name Modal
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} for showing a templated and animated overlay.
     */
    export class Modal extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $utils
         * @memberof platui.Modal
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        /**
         * @name $compat
         * @memberof platui.Modal
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $compat: plat.ICompat = plat.acquire(__Compat);

        /**
         * @name templateString
         * @memberof platui.Modal
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString = '<div class="plat-modal-container"></div>\n';

        /**
         * @name options
         * @memberof platui.Modal
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IModalOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IModalOptions>;

        /**
         * @name _modalElement
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTML element representing the content of the modal.
         */
        protected _modalElement: HTMLElement;

        /**
         * @name _isVisible
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the modal is currently visible.
         */
        protected _isVisible = false;

        /**
         * @name _loaded
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control has been loaded.
         */
        protected _loaded = false;

        /**
         * @name _preloadedValue
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A value specified prior to the control being loaded.
         */
        protected _preloadedValue = false;

        /**
         * @name _transitionEnd
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The browser's "transitionend" event.
         */
        protected _transitionEnd: string;

        /**
         * @name _transitionHash
         * @memberof platui.Modal
         * @kind property
         * @access protected
         * 
         * @type {plat.IObject<boolean>}
         * 
         * @description
         * A hash for validating available transitions.
         */
        protected _transitionHash: plat.IObject<boolean> = {
            up: true,
            down: true,
            left: true,
            right: true,
            fade: true
        };

        /**
         * @name setClasses
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Modal + ' ' + __Hide + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Check for templateUrl and set if needed then hide the control.
         * 
         * @returns {void}
         */
        initialize(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IModalOptions>>{},
                options = optionObj.value || <IModalOptions>{};

            this.templateUrl = options.templateUrl;
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Add the innerTemplate to the control's element.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var $utils = this.$utils,
                modalContainer: HTMLElement;

            if ($utils.isString(this.templateUrl)) {
                var fragment = this.dom.serializeHtml(this.templateString),
                    element = this.element,
                    childNodes: Array<Node> = Array.prototype.slice.call(element.childNodes);

                modalContainer = this._modalElement = <HTMLElement>fragment.firstChild;
                while (childNodes.length > 0) {
                    modalContainer.appendChild(childNodes.shift());
                }

                element.appendChild(fragment);
                return;
            }

            modalContainer = this._modalElement = <HTMLElement>this.element.firstElementChild;

            var innerTemplate = this.innerTemplate;
            if ($utils.isNode(innerTemplate)) {
                modalContainer.appendChild(innerTemplate);
            }
        }

        /**
         * @name loaded
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Check for a transition and initialize it if necessary.
         * 
         * @returns {void}
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IModalOptions>>{},
                options = optionObj.value || <IModalOptions>{},
                transition = options.transition;

            this._modalElement = this._modalElement || <HTMLElement>this.element.firstElementChild;
            this._loaded = true;

            if (!this.$utils.isString(transition) || transition === 'none') {
                this.dom.addClass(this._modalElement, __Plat + 'no-transition');
                if (this._preloadedValue) {
                    this.$utils.postpone(() => {
                        this._show();
                    });
                }
                return;
            } else if (!this._transitionHash[transition]) {
                var Exception: plat.IExceptionStatic = plat.acquire(plat.IExceptionStatic);
                Exception.warn('Custom transition: "' + transition +
                    '" defined for "' + this.type + '." Please ensure the transition is defined to avoid errors.');
            }

            this._transitionEnd = this.$compat.animationEvents.$transitionEnd;
            this.dom.addClass(this._modalElement, __Plat + transition + ' ' + __Plat + 'modal-transition');
            if (this._preloadedValue) {
                this.$utils.postpone(() => {
                    this._show();
                });
            }
        }

        /**
         * @name show
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Shows the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        show(): void {
            var wasHidden = !this._isVisible;
            this._show();
            if (wasHidden) {
                this.propertyChanged(true);
            }
        }

        /**
         * @name hide
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Hides the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        hide(): void {
            var wasVisible = this.isVisible;
            this._hide();
            if (wasVisible) {
                this.propertyChanged(false);
            }
        }

        /**
         * @name toggle
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Toggles the visibility of the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        toggle(): void {
            if (this._isVisible) {
                this.hide();
                return;
            }

            this.show();
        }

        /**
         * @name isVisible
         * @memberof platui.Modal
         * @kind function
         * @access public
         * 
         * @description
         * Whether or not the {@link platui.Modal|Modal} is currently visible.
         * 
         * @returns {boolean} True if the {@link platui.Modal|Modal} is currently open 
         * and visible, false otherwise.
         */
        isVisible(): boolean {
            return this._isVisible;
        }

        /**
         * @name setProperty
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any): void {
            if (!this._loaded) {
                this._preloadedValue = newValue;
                return;
            }

            if (this.$utils.isBoolean(newValue)) {
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
        }

        /**
         * @name _show
         * @memberof platui.Modal
         * @kind function
         * @access protected
         * 
         * @description
         * Shows the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        protected _show(): void {
            var dom = this.dom;
            dom.removeClass(this.element, __Hide);
            this.$utils.defer(() => {
                dom.addClass(this._modalElement, __Plat + 'activate');
            }, 25);

            this._isVisible = true;
        }

        /**
         * @name _hide
         * @memberof platui.Modal
         * @kind function
         * @access protected
         * 
         * @description
         * Hides the {@link platui.Modal|Modal}.
         * 
         * @returns {void}
         */
        protected _hide(): void {
            var dom = this.dom;
            if (this.$utils.isString(this._transitionEnd)) {
                this._addHideOnTransitionEnd();
            } else {
                dom.addClass(this.element, __Hide);
            }

            dom.removeClass(this._modalElement, __Plat + 'activate');
            this._isVisible = false;
        }

        /**
         * @name _addHideOnTransitionEnd
         * @memberof platui.Modal
         * @kind function
         * @access protected
         * 
         * @description
         * Listens for the transition to end and hides the element after it is finished.
         * 
         * @returns {void}
         */
        protected _addHideOnTransitionEnd(): void {
            var element = this.element,
                remove = this.addEventListener(element, this._transitionEnd, () => {
                    remove();
                    this.dom.addClass(element, __Hide);
                }, false);
        }
    }

    plat.register.control(__Modal, Modal);

    /**
     * @name IModalOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Modal|Modal} control.
     */
    export interface IModalOptions {
        /**
         * @name style
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The style of {@link platui.Modal|Modal}. 
         * Defaults to "full".
         * 
         * @remarks
         * - "full" - The {@link platui.Modal|Modal} fills the whole screen.
         * - "halfWidth" - The {@link platui.Modal|Modal} fills the whole screen lengthwise and 
         * half the screen in width. When combined as "halfWidth centered" it will place the 
         * control in the middle of the screen horizontally. Otherwise, its position is specified 
         * by the defined LESS variables.
         * - "halfHeight" - The {@link platui.Modal|Modal} fills half the screen lengthwise and 
         * the whole screen in width. When combined as "halfHeight centered" it will place the 
         * control in the middle of the screen vertically. Otherwise, its position is specified 
         * by the defined LESS variables.
         * - "half" - The {@link platui.Modal|Modal} fills half the screen and its position is 
         * specified by the defined LESS variables. The top and left positioning refer to the midpoint 
         * of the {@link platui.Modal|Modal}. When combined as "half centered" the control will be 
         * placed dead center in the middle of the screen.
         * - "custom" - The {@link platui.Modal|Modal's} size and positioning is specified by the 
         * defined LESS variables. When combined as "custom centered" the top and left positioning 
         * refer to the midpoint of the control.
         */
        //style?: string;

        /**
         * @name transition
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The transition type/direction the {@link platui.Modal|Modal} will enter with. 
         * Defaults to "none".
         * 
         * @remarks
         * - "none"
         * - "left"
         * - "right"
         * - "up"
         * - "down"
         * - "fade"
         */
        transition?: string;

        /**
         * @name templateUrl
         * @memberof platui.IModalOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The url of the {@link platui.Modal|Modal's} intended template if not using 
         * innerHTML.
         * 
         * @remarks
         * This URL must be a static string and cannot be a bound item on a parent control's context.
         */
        templateUrl?: string;
    }

    /// <reference path="../../references.d.ts" />
    
	/**
     * @name Navbar
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that acts as a Navigation Element.
     */
	export class Navbar extends plat.ui.TemplateControl implements IUIControl {

        /**
         * @name $utils
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * @name $animator
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);

        /**
         * @name replaceWith
         * @memberof platui.Navbar
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * Replaces the <plat-navbar> node with a <nav> node.
         */
        replaceWith = 'nav';

        /**
         * @name _actionAnimation
         * @memberof platui.Navbar
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.ISimpleCssAnimation}
         * 
         * @description
         * The registered animation that animates when a navbar-action is pressed
         */
        _actionAnimation = plat.acquire(platui.NavbarActionPulse);

        /**
         * @name setClasses
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Navbar + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * 
         * @description
         * Sets default classes.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Navbar
         * @kind function
         * @access public
         * 
         * @description
         * Registers and sets event listeners on navbar action elements
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var element = this.element,
                navbarActions = element.querySelectorAll('.navbar-action'),
                i: number;
                
            for (i = 0; i < navbarActions.length; i++) {
                this.addEventListener(navbarActions[i], __$tap, this._actionPressed, false);
            }
        }

        /**
         * @name _actionPressed
         * @memberof platui.Navbar
         * @kind function
         * @access protected
         * 
         * @description
         * Animate .navbar-action elements when the user touches the {@link platui.Navbar|Navbar}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
         _actionPressed(ev: plat.ui.IGestureEvent): void {
            // this.dom.addClass(ev.srcElement, 'plat-navbar-action-pulse');
            this.$animator.animate(ev.srcElement, __NavbarActionPulse, { pseudo: '::after' });
         }
	}

	plat.register.control(__Navbar, Navbar);

    /// <reference path="../../references.d.ts" />
    
	/**
     * An animation control that enlarges and shrinks a transparent circle behind the navbar action
     */
	export class NavbarActionPulse extends plat.ui.animations.SimpleCssAnimation {
		className = __NavbarActionPulse;
	}

	plat.register.animation(__NavbarActionPulse, NavbarActionPulse);

    /**
     * @name Slider
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes an HTML5 input[type="range"].
     */
    export class Slider extends plat.ui.BindablePropertyControl implements IUIControl {
        /**
         * @name $window
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $window: Window = plat.acquire(__Window);
        /**
         * @name $document
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);
        /**
         * @name $utils
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        /**
         * @name $animator
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);

        /**
         * @name templateString
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-slider-container">' +
        '    <div class="plat-slider-offset">' +
        '        <div class="plat-knob"></div>' +
        '    </div>' +
        '</div>';

        /**
         * @name options
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.ISliderOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<ISliderOptions>;

        /**
         * @name value
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current value of the {@link platui.Slider|Slider}.
         */
        value: number;

        /**
         * @name min
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Slider|Slider}.
         */
        min: number;

        /**
         * @name max
         * @memberof platui.Slider
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Slider|Slider}.
         */
        max: number;

        /**
         * @name _slider
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the slider.
         */
        protected _slider: HTMLElement;

        /**
         * @name _knob
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the knob.
         */
        protected _knob: HTMLElement;

        /**
         * @name _lastTouch
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        protected _lastTouch: plat.ui.IPoint;

        /**
         * @name _maxOffset
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The maximum slider offset.
         */
        protected _maxOffset: number;

        /**
         * @name _increment
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The slider's pixel based increment value.
         */
        protected _increment: number;

        /**
         * @name _step
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * Denotes the incremental step value of the {@link platui.Slider|Slider's} value property.
         */
        protected _step: number;

        /**
         * @name _orientation
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The orientation of this control.
         */
        protected _orientation: string;

        /**
         * @name _reversed
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the min and max positions have been reversed.
         */
        protected _reversed: boolean;

        /**
         * @name _knobOffset
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current knob offset.
         */
        protected _knobOffset = 0;

        /**
         * @name _loaded
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the slider has already been loaded. Useful for when 
         * the {@link plat.controls.Bind|Bind} tries to set a value.
         */
        protected _loaded = false;

        /**
         * @name _lengthProperty
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using height or width as the length of the slider.
         */
        protected _lengthProperty: string;

        /**
         * @name _cloneAttempts
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.Slider
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _maxCloneAttempts = 25;

        /**
         * @name setClasses
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Slider + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Set the proper classes for the control.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name loaded
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Determine the button type and apply the proper classes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var element = this.element,
                slider = this._slider = <HTMLElement>element.firstElementChild.firstElementChild,
                isNumber = this.$utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<ISliderOptions>>{},
                options = optionObj.value || <ISliderOptions>{},
                optionValue = Number(options.value),
                optionMin = options.min,
                optionMax = options.max,
                step = options.step,
                reversed = this._reversed = (options.reverse === true),
                orientation = this._orientation = options.orientation || 'horizontal',
                bindValue = this.value,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100,
                value = isNumber(bindValue) ? bindValue : isNumber(optionValue) ? optionValue : min,
                className = __Plat + orientation;

            this._knob = <HTMLElement>slider.firstElementChild;

            if (reversed) {
                className += __Reversed;
            }

            this.dom.addClass(element, className);

            // reset value to minimum in case Bind set it to a value
            this.value = min;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;

            if (min >= max) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + this.type + '\'s" min is greater than or equal to its max. Setting max to min + 1.');
                this.max = min + 1;
            }

            this._setLength();
            if (!this._maxOffset) {
                this._setOffsetWithClone();
            }

            this._setIncrement();
            this._initializeEvents(orientation);

            this.setValue(value);
            this._loaded = true;
        }

        /**
         * @name setProperty
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the {@link platui.Slider|Slider's} bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any): void {
            if (newValue === this.value) {
                return;
            } else if (!this.$utils.isNumber(newValue)) {
                newValue = this.min;
            }

            if (this._loaded) {
                this._setValue(newValue, true, false);
                return;
            }

            this.value = newValue;
        }

        /**
         * @name setValue
         * @memberof platui.Slider
         * @kind function
         * @access public
         * 
         * @description
         * Set the value of the {@link platui.Slider|Slider}. If an invalid value is passed in 
         * nothing will happen.
         * 
         * @param {number} value The value to set the {@link platui.Slider|Slider} to.
         * 
         * @returns {void}
         */
        setValue(value: number): void {
            if (!this.$utils.isNumber(value)) {
                return;
            }

            this._setValue(value, true, true);
        }

        /**
         * @name _touchStart
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Log the first touch.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event object.
         * 
         * @returns {void}
         */
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }

        /**
         * @name _touchEnd
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Set the new slider offset.
         * 
         * @param {plat.ui.IGestureEvent} ev The $trackend event object.
         * 
         * @returns {void}
         */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void {
            var newOffset = this._calculateOffset(ev),
                maxOffset = this._maxOffset;

            if (newOffset < 0) {
                this._knobOffset = 0;
                return;
            } else if (newOffset > maxOffset) {
                this._knobOffset = maxOffset;
                return;
            }

            this._knobOffset = newOffset;
        }

        /**
         * @name _track
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Track the knob movement.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         * 
         * @returns {void}
         */
        protected _track(ev: plat.ui.IGestureEvent): void {
            var length = this._calculateOffset(ev),
                maxOffset = this._maxOffset,
                value: number;

            if (length < 0) {
                value = this.min;
                if (value - this.value >= 0) {
                    return;
                }
                length = 0;
            } else if (length > maxOffset) {
                value = this.max;
                if (value - this.value <= 0) {
                    return;
                }
                length = maxOffset;
            } else {
                value = this._calculateValue(length);
            }

            this._setValue(value, false, true);
            this._slider.style[<any>this._lengthProperty] = length + 'px';
        }

        /**
         * @name _initializeEvents
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Initialize the proper tracking events.
         * 
         * @param {string} orientation The orientation of the control.
         * 
         * @returns {void}
         */
        protected _initializeEvents(orientation: string): void {
            var knob = this._knob,
                trackFn: EventListener = this._track,
                track: string,
                reverseTrack: string;

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

            this.addEventListener(knob, __$touchstart, this._touchStart, false);
            this.addEventListener(knob, track, trackFn, false);
            this.addEventListener(knob, reverseTrack, trackFn, false);
            this.addEventListener(knob, __$trackend, this._touchEnd, false);
        }

        /**
         * @name _calculateValue
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the current value based on knob position and slider width.
         * 
         * @param {number} width The current width of the slider.
         * 
         * @returns {number} The current value of the {link platui.Slider|Slider}.
         */
        protected _calculateValue(width: number): number {
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
        }

        /**
         * @name _calculateKnobPosition
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates knob position based on current value.
         * 
         * @param {number} value The current value of the {link platui.Slider|Slider}.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        protected _calculateKnobPosition(value: number): number {
            return (value - this.min) * this._increment;
        }

        /**
         * @name _calculateOffset
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the new offset of the slider based on the old offset and the distance moved.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        protected _calculateOffset(ev: plat.ui.IGestureEvent): number {
            switch (this._orientation) {
                case 'horizontal':
                    return this._reversed ?
                        (this._knobOffset + this._lastTouch.x - ev.clientX) :
                        (this._knobOffset + ev.clientX - this._lastTouch.x);
                case 'vertical':
                    return this._reversed ?
                        (this._knobOffset + this._lastTouch.y - ev.clientY) :
                        (this._knobOffset + ev.clientY - this._lastTouch.y);
                default:
                    return 0;
            }
        }

        /**
         * @name _setLength
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the property to use for length and sets the max length of the slider.
         * 
         * @param {HTMLElement} element? The element to use to obtain the max length.
         * 
         * @returns {number} The length of the slider.
         */
        protected _setLength(element?: HTMLElement): number {
            element = element || this._slider.parentElement;
            switch (this._orientation) {
                case 'horizontal':
                    this._lengthProperty = 'width';
                    return (this._maxOffset = element.offsetWidth);
                case 'vertical':
                    this._lengthProperty = 'height';
                    return (this._maxOffset = element.offsetHeight);
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid orientation "' + this._orientation + '" for "' + this.type + '."');
                    return 0;
            }
        }

        /**
         * @name _setIncrement
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the increment for sliding the {link platui.Slider|Slider}.
         * 
         * @returns {number} The slider's increment value.
         */
        protected _setIncrement(): number {
            return (this._increment = this._maxOffset / (this.max - this.min));
        }

        /**
         * @name _setValue
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the value of the {@link platui.Slider|Slider}.
         * 
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * @param {boolean} setProperty Whether or not we need to fire a propertyChanged event.
         * 
         * @returns {void}
         */
        protected _setValue(newValue: number, setKnob: boolean, setProperty: boolean): void {
            var value = this.value;
            if (newValue === value) {
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (Math.abs(newValue - value) < this._step) {
                return;
            }

            this.value = newValue;
            if (setKnob) {
                this._setKnob();
            }

            if (setProperty) {
                this.propertyChanged(newValue, value);
            }
        }

        /**
         * @name _setKnob
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Animates and sets the knob position.
         * 
         * @param {number} value? The value to use to calculate the knob position. If no value is 
         * specified, the current {@link platui.Slider|Slider's} value will be used.
         * 
         * @returns {void}
         */
        protected _setKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                length = this._calculateKnobPosition((value || this.value));

            animationOptions[this._lengthProperty] = length + 'px';
            this.$animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._knobOffset = length;
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.Slider
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a clone of this element and uses it to find the max offset.
         * 
         * @returns {void}
         */
        protected _setOffsetWithClone(): void {
            var element = this.element,
                body = this.$document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic),
                        type = this.type;
                    $exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' +
                        'DOM. Disposing of the ' + type);
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this.$utils.postpone(this._setOffsetWithClone, null, this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                regex = /\d+(?!\d+|%)/,
                $window = this.$window,
                parentChain = <Array<HTMLElement>>[],
                shallowCopy = clone,
                computedStyle: CSSStyleDeclaration,
                width: string;

            shallowCopy.id = '';
            while (!regex.test((width = (computedStyle = $window.getComputedStyle(element)).width))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty('width', width, 'important');
                element = element.parentElement;
                shallowCopy = <HTMLElement>element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }

            if (parentChain.length > 0) {
                var curr = parentChain.pop(),
                    currStyle = curr.style,
                    temp: HTMLElement;

                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }

                curr.insertBefore(clone, null);
            }

            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty('width', width, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._setLength(<HTMLElement>clone.firstElementChild);
            body.removeChild(shallowCopy);
        }
    }

    plat.register.control(__Slider, Slider);

    /**
     * @name ISliderOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Slider|Slider} control.
     */
    export interface ISliderOptions {
        /**
         * @name orientation
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The orientation of the {@link platui.Slider|Slider}. 
         * Defaults to "horizontal".
         * 
         * @remarks
         * - "horizontal" - horizontal control.
         * - "vertical" - vertical control.
         */
        orientation?: string;

        /**
         * @name reverse
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the min and max positions are reversed. 
         * Defaults to false.
         */
        reverse?: boolean;

        /**
         * @name value
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current value of the {@link platui.Slider|Slider}.
         */
        value?: number;

        /**
         * @name min
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Slider|Slider}.
         */
        min?: number;

        /**
         * @name max
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Slider|Slider}.
         */
        max?: number;

        /**
         * @name step
         * @memberof platui.ISliderOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The incremental step value of the {@link platui.Slider|Slider}.
         */
        step?: number;
    }

    /**
     * @name Range
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that allows for a lower and upper value, 
     * thus creating a variable range of values.
     */
    export class Range extends plat.ui.TemplateControl implements IUIControl {
        /**
         * @name $window
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $window: Window = plat.acquire(__Window);
        /**
         * @name $document
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);
        /**
         * @name $utils
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        /**
         * @name $animator
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);

        /**
         * @name context
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {platui.IRangeContext}
         * 
         * @description
         * The specifically defined context for this control.
         */
        context: IRangeContext;

        /**
         * @name templateString
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-range-container">' +
        '    <div class="plat-slider-offset">' +
        '        <div class="plat-lower-knob"></div>' +
        '        <div class="plat-upper-knob"></div>' +
        '    </div>' +
        '</div>';

        /**
         * @name options
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IRangeOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IRangeOptions>;

        /**
         * @name lower
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current lower value of the {@link platui.Range|Range}.
         */
        lower: number;

        /**
         * @name upper
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The current upper value of the {@link platui.Range|Range}.
         */
        upper: number;

        /**
         * @name min
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Range|Range}.
         */
        min: number;

        /**
         * @name max
         * @memberof platui.Range
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Range|Range}.
         */
        max: number;

        /**
         * @name _slider
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the slider element.
         */
        protected _slider: HTMLElement;

        /**
         * @name _lowerKnob
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the lower knob.
         */
        protected _lowerKnob: HTMLElement;

        /**
         * @name _upperKnob
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement representing the second knob of the {@link platui.Range|Range}.
         */
        protected _upperKnob: HTMLElement;

        /**
         * @name _lastTouch
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        protected _lastTouch: IKnobPosition;

        /**
         * @name _maxOffset
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The maximum slider element offset.
         */
        protected _maxOffset: number;

        /**
         * @name _increment
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The slider element's pixel based increment value.
         */
        protected _increment: number;

        /**
         * @name _step
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * Denotes the incremental step value of the {@link platui.Range|Range's} value property.
         */
        protected _step: number;

        /**
         * @name _orientation
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The orientation of this control.
         */
        protected _orientation: string;

        /**
         * @name _reversed
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the upper and lower knobs have been _reversed.
         */
        protected _reversed: boolean;

        /**
         * @name _lowerKnobOffset
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current lower knob offset.
         */
        protected _lowerKnobOffset: number;

        /**
         * @name _upperKnobOffset
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current upper knob offset.
         */
        protected _upperKnobOffset: number;

        /**
         * @name _lengthProperty
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using height or width as the length of the sliding element.
         */
        protected _lengthProperty: string;

        /**
         * @name _positionProperty
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using left, right, top, or bottom as the position of the sliding element.
         */
        protected _positionProperty: string;

        /**
         * @name _isSelf
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * A boolean value specifying that this control is the one modifying the observed context values.
         */
        protected _isSelf = false;

        /**
         * @name _cloneAttempts
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.Range
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _maxCloneAttempts = 25;

        /**
         * @name setClasses
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Range + ' ' + (className || ''));
        }

        /**
         * @name contextChanged
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Handles the context object being externally changed.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            var context = this.context,
                $utils = this.$utils;
            if (!$utils.isObject(context)) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + this.type + '\'s" context should be an object that implements the platui.IRangeContext interface.');
                return;
            }

            var lower = context.lower,
                upper = context.upper,
                isNumber = $utils.isNumber;

            this.setLower(isNumber(lower) ? lower : 0);
            this.setUpper(isNumber(upper) ? upper : this.max);
        }

        /**
         * @name initialize
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Set the proper classes for the control.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name loaded
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Determine the button type and apply the proper classes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var context = this.context || <IRangeContext>{},
                element = this.element,
                slider = this._slider = <HTMLElement>element.firstElementChild.firstElementChild,
                $utils = this.$utils,
                isNumber = $utils.isNumber,
                optionObj = this.options || <plat.observable.IObservableProperty<IRangeOptions>>{},
                options = optionObj.value || <IRangeOptions>{},
                optionLower = Number(options.lower),
                optionUpper = Number(options.upper),
                optionMin = options.min,
                optionMax = options.max,
                step = options.step,
                orientation = this._orientation = options.orientation || 'horizontal',
                reversed = this._reversed = (options.reverse === true),
                contextLower = context.lower,
                contextUpper = context.upper,
                min = this.min = isNumber(optionMin) ? Math.floor(optionMin) : 0,
                max = this.max = isNumber(optionMax) ? Math.ceil(optionMax) : 100,
                lower = isNumber(contextLower) ? contextLower : isNumber(optionLower) ? optionLower : min,
                upper = isNumber(contextUpper) ? contextUpper : isNumber(optionUpper) ? optionUpper : max,
                className = __Plat + orientation,
                Exception: plat.IExceptionStatic;

            this._lowerKnob = <HTMLElement>slider.firstElementChild;
            this._upperKnob = <HTMLElement>slider.lastElementChild;

            // if it's a reversed direction, swap knobs.
            if (reversed) {
                var lowerKnob = this._lowerKnob;
                this._lowerKnob = this._upperKnob;
                this._upperKnob = lowerKnob;
                className += __Reversed;
            }

            this.dom.addClass(element, className);

            // reset value to minimum in case context is already set to a value
            this.lower = min;
            this.upper = max;
            this._step = isNumber(step) ? (step > 0 ? step : 1) : 1;

            if (min >= max) {
                Exception = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + this.type + '\'s" min is greater than or equal to its max. Setting max to min + 1.');
                this.max = min + 1;
            }

            this._setPositionAndLength();
            if (!this._maxOffset) {
                this._setOffsetWithClone();
            }

            this._setIncrement();
            this._setLowerKnob(min);
            this._initializeEvents(orientation);

            if (!$utils.isObject(this.context)) {
                Exception = plat.acquire(__ExceptionStatic);
                Exception.warn('"' + this.type + '\'s" context should be an object that implements the platui.IRangeContext interface.');
                return;
            }

            this.setLower(lower);
            this.setUpper(upper);
            this._watchContext();
        }

        /**
         * @name setLower
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Set the lower value of the {@link platui.Range|Range}. If an invalid value is passed in 
         * nothing will happen.
         * 
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         * 
         * @returns {void}
         */
        setLower(value: number): void {
            var $utils = this.$utils,
                isNumber = $utils.isNumber;

            if (!$utils.isObject(this.context)) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('Cannot set the lower value of a "' + this.type + '" whose context has ' +
                    'not yet been set to an object.');
                return;
            } else if (!isNumber(value)) {
                var numberVal = Number(value);
                if (isNumber(numberVal)) {
                    value = numberVal;
                } else {
                    return;
                }
            }

            this._setLower(value, true);
        }

        /**
         * @name setUpper
         * @memberof platui.Range
         * @kind function
         * @access public
         * 
         * @description
         * Set the upper value of the {@link platui.Range|Range}. If an invalid value is passed in 
         * nothing will happen.
         * 
         * @param {number} value The value to set the {@link platui.Range|Range} to.
         * 
         * @returns {void}
         */
        setUpper(value: number): void {
            var $utils = this.$utils,
                isNumber = $utils.isNumber;

            if (!$utils.isObject(this.context)) {
                var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                Exception.warn('Cannot set the upper value of a "' + this.type + '" whose context has ' +
                    'not yet been set to an object.');
                return;
            } else if (!isNumber(value)) {
                var numberVal = Number(value);
                if (isNumber(numberVal)) {
                    value = numberVal;
                } else {
                    return;
                }
            }

            this._setUpper(value, true);
        }

        /**
         * @name _watchContext
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Observe the necessary context values.
         * 
         * @returns {void}
         */
        protected _watchContext(): void {
            var context = this.context;
            this.observe(context, 'lower', (newValue: number, oldValue: number) => {
                if (this._isSelf || newValue === oldValue) {
                    return;
                }

                this.setLower(newValue);
            });

            this.observe(context, 'upper', (newValue: number, oldValue: number) => {
                if (this._isSelf || newValue === oldValue) {
                    return;
                }

                this.setUpper(newValue);
            });
        }

        /**
         * @name _initializeEvents
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Initialize the proper tracking events.
         * 
         * @param {string} orientation The orientation of the control.
         * 
         * @returns {void}
         */
        protected _initializeEvents(orientation: string): void {
            var lowerKnob = this._lowerKnob,
                upperKnob = this._upperKnob,
                touchstart = this._touchStart,
                touchEnd = this._touchEnd,
                trackLower = this._trackLower,
                trackUpper = this._trackUpper,
                track: string,
                reverseTrack: string;

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
            this.addEventListener(lowerKnob, __$trackend, touchEnd, false);
            this.addEventListener(upperKnob, __$trackend, touchEnd, false);
        }

        /**
         * @name _touchStart
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Log the first touch.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event object.
         * 
         * @returns {void}
         */
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            if (ev.touches.length > 1) {
                return;
            }

            var target = <HTMLElement>ev.currentTarget,
                lastTouch = this._lastTouch;
            if (!this.$utils.isNull(lastTouch)) {
                if (lastTouch.target !== target) {
                    lastTouch.target.style.zIndex = '0';
                    target.style.zIndex = '1';
                }
            } else {
                target.style.zIndex = '1';
            }

            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY,
                target: target
            };
        }

        /**
         * @name _touchEnd
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Set the new slider element offset.
         * 
         * @param {plat.ui.IGestureEvent} ev The $trackend event object.
         * 
         * @returns {void}
         */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void {
            var lastTouch = this._lastTouch,
                target = ev.currentTarget;

            if (this.$utils.isNull(lastTouch) || (lastTouch.target !== target)) {
                return;
            }

            var isLower = target === this._lowerKnob,
                newOffset = this._calculateOffset(ev, isLower);

            this._setOffset(newOffset, isLower);
        }

        /**
         * @name _setOffset
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the designated knob element's offset to the given value.
         * 
         * @param {number} offset The new offset.
         * @param {boolean} isLower Whether we're setting the lower or upper knob.
         * 
         * @returns {number} The new upper offset.
         */
        protected _setOffset(offset: number, isLower: boolean): number {
            var maxOffset = this._maxOffset;

            if (offset < 0) {
                return isLower ? (this._lowerKnobOffset = 0) :
                    (this._upperKnobOffset = 0);
            } else if (offset > maxOffset) {
                return isLower ? (this._lowerKnobOffset = maxOffset) :
                    (this._upperKnobOffset = maxOffset);
            }

            return isLower ? (this._lowerKnobOffset = offset) :
                (this._upperKnobOffset = offset);
        }

        /**
         * @name _trackLower
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Track the lower knob movement.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         * 
         * @returns {void}
         */
        protected _trackLower(ev: plat.ui.IGestureEvent): void {
            var maxOffset = this._maxOffset,
                position = this._calculateOffset(ev, true),
                value: number;

            if (position < 0) {
                value = this.min;
                if (value - this.lower >= 0) {
                    value = null;
                }
                position = 0;
            } else if (position > maxOffset) {
                value = this.max;
                if (value - this.lower <= 0) {
                    value = null;
                }
                position = maxOffset;
            } else {
                value = this._calculateValue(position);
                if (value - this.lower === 0) {
                    value = null;
                }

                if (position > this._upperKnobOffset) {
                    this._positionTogether(position, value);
                    this._setOffset(position, false);
                    return;
                }
            }

            this._positionLower(position, value);
        }

        /**
         * @name _trackUpper
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Track the upper knob movement.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track event object.
         * 
         * @returns {void}
         */
        protected _trackUpper(ev: plat.ui.IGestureEvent): void {
            var maxOffset = this._maxOffset,
                position = this._calculateOffset(ev, false),
                value: number;

            if (position < 0) {
                value = this.min;
                if (value - this.upper >= 0) {
                    value = null;
                }
                position = 0;
            } else if (position > maxOffset) {
                value = this.max;
                if (value - this.upper <= 0) {
                    value = null;
                }
                position = maxOffset;
            } else {
                value = this._calculateValue(position);
                if (value - this.upper === 0) {
                    value = null;
                }

                if (position < this._lowerKnobOffset) {
                    this._positionTogether(position, value);
                    this._setOffset(position, true);
                    return;
                }
            }

            this._positionUpper(position, value);
        }

        /**
         * @name _positionLower
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Positions the slider element and adjusts it's length to account 
         * for lower knob movement.
         * 
         * @param {number} position The new position of the lower knob.
         * @param {number} value? The new value to set if specified.
         * 
         * @returns {void}
         */
        protected _positionLower(position: number, value?: number): void {
            var style = this._slider.style;
            style[<any>this._positionProperty] = position + 'px';
            style[<any>this._lengthProperty] = (this._upperKnobOffset - position) + 'px';

            if (value === null) {
                return;
            }

            this._setLower(value, false);
        }

        /**
         * @name _positionUpper
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Positions the slider element and adjusts it's length to account 
         * for upper knob movement.
         * 
         * @param {number} position The new position of the upper knob.
         * @param {number} value? The new value to set if specified.
         * 
         * @returns {void}
         */
        protected _positionUpper(position: number, value?: number): void {
            this._slider.style[<any>this._lengthProperty] = (position - this._lowerKnobOffset) + 'px';

            if (value === null) {
                return;
            }

            this._setUpper(value, false);
        }

        /**
         * @name _positionTogether
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Positions the slider element and adjusts it's length to account 
         * for synchronized knob movement.
         * 
         * @param {number} position The new position of the knobs.
         * @param {number} value? The new value to set if specified.
         * 
         * @returns {void}
         */
        protected _positionTogether(position: number, value?: number): void {
            var style = this._slider.style;
            style[<any>this._positionProperty] = position + 'px';
            style[<any>this._lengthProperty] = '0px';

            if (value === null) {
                return;
            }

            this._setLower(value, false);
            this._setUpper(value, false);
        }

        /**
         * @name _calculateValue
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the current value based on knob position and slider element width.
         * 
         * @param {number} width The current width of the slider element.
         * 
         * @returns {number} The current value of the {link platui.Range|Range}.
         */
        protected _calculateValue(width: number): number {
            var step = this._step;
            return (this.min + Math.round(width / this._increment / step) * step);
        }

        /**
         * @name _calculateOffset
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the new offset of the slider element based on the old offset and the distance moved.
         * 
         * @param {plat.ui.IGestureEvent} ev The $track or $trackend event object.
         * @param {boolean} isLower Whether the current knob is the lower or the upper knob.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        protected _calculateOffset(ev: plat.ui.IGestureEvent, isLower: boolean): number {
            var currentOffset = isLower ? this._lowerKnobOffset : this._upperKnobOffset,
                displacement: number;

            if (this._orientation === 'vertical') {
                displacement = this._reversed ? this._lastTouch.y - ev.clientY : ev.clientY - this._lastTouch.y;
            } else {
                displacement = this._reversed ? this._lastTouch.x - ev.clientX : ev.clientX - this._lastTouch.x;
            }

            return currentOffset + displacement;
        }

        /**
         * @name _calculateKnobPosition
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates knob position based on current value.
         * 
         * @param {number} value The current value of the {link platui.Range|Range}.
         * 
         * @returns {number} The current position of the knob in pixels.
         */
        protected _calculateKnobPosition(value: number): number {
            return (value - this.min) * this._increment;
        }

        /**
         * @name _setLower
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the lower value of the {@link platui.Range|Range}.
         * 
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * 
         * @returns {void}
         */
        protected _setLower(newValue: number, setKnob: boolean): void {
            var lower = this.lower,
                context = this.context || <IRangeContext>{};

            if (newValue === lower) {
                if (context.lower !== lower) {
                    this._isSelf = true;
                    context.lower = lower;
                    this._isSelf = false;
                }
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (newValue >= this.upper) {
                newValue = this.upper;
            } else if (Math.abs(newValue - lower) < this._step) {
                return;
            }

            this._isSelf = true;
            this.lower = context.lower = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setLowerKnob();
            }
        }

        /**
         * @name _setUpper
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the value of the {@link platui.Range|Range}.
         * 
         * @param {number} newValue The new value to set.
         * @param {boolean} setKnob Whether or not we need to set the knob position.
         * 
         * @returns {void}
         */
        protected _setUpper(newValue: number, setKnob: boolean): void {
            var upper = this.upper,
                context = this.context || <IRangeContext>{};

            if (newValue === upper) {
                if (context.upper !== upper) {
                    this._isSelf = true;
                    context.upper = upper;
                    this._isSelf = false;
                }
                return;
            } else if (newValue >= this.max) {
                newValue = this.max;
            } else if (newValue <= this.min) {
                newValue = this.min;
            } else if (newValue <= this.lower) {
                newValue = this.lower;
            } else if (Math.abs(newValue - upper) < this._step) {
                return;
            }

            this._isSelf = true;
            this.upper = context.upper = newValue;
            this._isSelf = false;
            if (setKnob) {
                this._setUpperKnob();
            }
        }

        /**
         * @name _setIncrement
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the increment for sliding the {link platui.Range|Range}.
         * 
         * @returns {number} The slider element's increment value.
         */
        protected _setIncrement(): number {
            return (this._increment = this._maxOffset / (this.max - this.min));
        }

        /**
         * @name _setPositionAndLength
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the properties to use for length and position and sets the max length of the sliding element.
         * 
         * @param {HTMLElement} element? The element to base the length off of.
         * 
         * @returns {number} The length of the sliding element.
         */
        protected _setPositionAndLength(element?: HTMLElement): number {
            element = element || this._slider.parentElement;

            switch (this._orientation) {
                case 'horizontal':
                    this._lengthProperty = 'width';
                    this._positionProperty = this._reversed ? 'right' : 'left';
                    return (this._maxOffset = element.offsetWidth);
                case 'vertical':
                    this._lengthProperty = 'height';
                    this._positionProperty = this._reversed ? 'bottom' : 'top';
                    return (this._maxOffset = element.offsetHeight);
                default:
                    var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                    Exception.warn('Invalid orientation "' + this._orientation + '" for "' + this.type + '."');
                    return 0;
            }
        }

        /**
         * @name _setLowerKnob
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Animates and sets the knob position.
         * 
         * @param {number} value? The value to use to calculate the knob position. If no value is 
         * specified, the current {@link platui.Range|Range's} value will be used.
         * 
         * @returns {void}
         */
        protected _setLowerKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                upperKnobOffset = this._upperKnobOffset,
                upperOffset = this.$utils.isNumber(upperKnobOffset) ? upperKnobOffset :
                this._setOffset(this._calculateKnobPosition(this.upper), false),
                position = this._calculateKnobPosition((value || this.lower));

            animationOptions[this._positionProperty] = position + 'px';
            animationOptions[this._lengthProperty] = (upperOffset - position) + 'px';
            this.$animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._lowerKnobOffset = position;
        }

        /**
         * @name _setUpperKnob
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Animates and sets the knob position.
         * 
         * @param {number} value? The value to use to calculate the knob position. If no value is 
         * specified, the current {@link platui.Range|Range's} value will be used.
         * 
         * @returns {void}
         */
        protected _setUpperKnob(value?: number): void {
            var animationOptions: plat.IObject<string> = {},
                length = this._calculateKnobPosition((value || this.upper));

            animationOptions[this._lengthProperty] = (length - this._lowerKnobOffset) + 'px';
            this.$animator.animate(this._slider, __Transition, {
                properties: animationOptions
            });
            this._upperKnobOffset = length;
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.Range
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a clone of this element and uses it to find the max offset.
         * 
         * @returns {void}
         */
        protected _setOffsetWithClone(): void {
            var element = this.element,
                body = this.$document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic),
                        type = this.type;
                    $exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' +
                        'DOM. Disposing of the ' + type);
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this.$utils.postpone(this._setOffsetWithClone, null, this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                regex = /\d+(?!\d+|%)/,
                $window = this.$window,
                parentChain = <Array<HTMLElement>>[],
                shallowCopy = clone,
                computedStyle: CSSStyleDeclaration,
                width: string;

            shallowCopy.id = '';
            while (!regex.test((width = (computedStyle = $window.getComputedStyle(element)).width))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty('width', width, 'important');
                element = element.parentElement;
                shallowCopy = <HTMLElement>element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }

            if (parentChain.length > 0) {
                var curr = parentChain.pop(),
                    currStyle = curr.style,
                    temp: HTMLElement;

                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }

                curr.insertBefore(clone, null);
            }

            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty('width', width, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._setPositionAndLength(<HTMLElement>clone.firstElementChild);
            body.removeChild(shallowCopy);
        }
    }

    plat.register.control(__Range, Range);

    /**
     * @name IRangeOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Range|Range} control.
     */
    export interface IRangeOptions {
        /**
         * @name orientation
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The orientation of the {@link platui.Range|Range}. 
         * Defaults to "horizontal".
         * 
         * @remarks
         * - "horizontal" - horizontal control.
         * - "vertical" - vertical control.
         */
        orientation?: string;

        /**
         * @name reverse
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the upper and lower knobs of the {@link platui.Range|Range} are reversed. 
         * Defaults to false.
         */
        reverse?: boolean;

        /**
         * @name lower
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The lower set value of the {@link platui.Range|Range}.
         */
        lower?: number;

        /**
         * @name upper
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The upper set value of the {@link platui.Range|Range}.
         */
        upper?: number;

        /**
         * @name min
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The min value of the {@link platui.Range|Range}.
         */
        min?: number;

        /**
         * @name max
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The max value of the {@link platui.Range|Range}.
         */
        max?: number;

        /**
         * @name step
         * @memberof platui.IRangeOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The incremental step value of the {@link platui.Range|Range}.
         */
        step?: number;
    }

    /**
     * @name IRangePoint
     * @memberof platui
     * @kind interface
     * 
     * @description
     * A point representing a potential knob position.
     */
    export interface IKnobPosition extends plat.ui.IPoint {
        /**
         * @name target
         * @memberof platui.IKnobPosition
         * @kind property
         * @access public
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The target element located at the x-y coordinate.
         */
        target?: HTMLElement;
    }

    /**
     * @name IRangeContext
     * @memberof platui
     * @kind interface
     * 
     * @description
     * Defines the expected context of the {@link platui.Range|Range} control.
     */
    export interface IRangeContext {
        /**
         * @name lower
         * @memberof platui.IRangeContext
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The lower set value of the {@link platui.Range|Range} control.
         */
        lower: number;

        /**
         * @name lower
         * @memberof platui.IRangeContext
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The upper set value of the {@link platui.Range|Range} control.
         */
        upper: number;
    }

    /**
     * @name Select
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.controls.Select}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that allows for data-binding a select box and adds 
     * custom styling to make it look consistent across all platforms.
     */
    export class Select extends plat.ui.controls.Select implements IUIControl {
        /**
         * @name setClasses
         * @memberof platui.Select
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Select + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Select
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            super.initialize();
            this.setClasses();
        }
    }

    plat.register.control(__Select, Select);

    /**
     * @name ISelectOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Select|Select} control.
     */
    export interface ISelectOptions {
        /**
         * @name group
         * @memberof platui.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array 
         * of objects to use to group the objects 
         * into optgroups.
         */
        group?: string;

        /**
         * @name value
         * @memberof platui.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's value.
         */
        value?: string;

        /**
         * @name textContent
         * @memberof platui.ISelectOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The property in your context array of 
         * objects with which to use to bind to the 
         * option's textContent.
         */
        textContent?: string;
    }

    /**
     * @name Input
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.BindablePropertyControl}
     * @implements {platui.IUIControl, platui.IFormControl}
     * 
     * @description
     * An {@link plat.ui.IBindablePropertyControl|IBindablePropertyControl} that standardizes and styles 
     * an HTML input element of various types.
     */
    export class Input extends plat.ui.BindablePropertyControl implements IUIControl, IFormControl {
        /**
         * @name $utils
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);

        /**
         * @name $compat
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $compat: plat.ICompat = plat.acquire(__Compat);

        /**
         * @name $regex
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {plat.expressions.IRegex}
         * 
         * @description
         * Reference to the {@link plat.expressions.IRegex|IRegex} injectable.
         */
        $regex: plat.expressions.IRegex = plat.acquire(__Regex);

        /**
         * @name templateString
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString =
        '<div class="plat-input-container">\n' +
        '    <span class="plat-input-image"></span>\n' +
        '    <input type="text" />\n' +
        '    <div class="plat-input-action"></div>\n' +
        '</div>\n';

        /**
         * @name options
         * @memberof platui.Input
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.IInputOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<IInputOptions>;

        /**
         * @name _imageElement
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement for the control's optional image.
         */
        protected _imageElement: HTMLElement;

        /**
         * @name _inputElement
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLInputElement}
         * 
         * @description
         * The HTMLInputElement for the control's input[type="text"].
         */
        protected _inputElement: HTMLInputElement;

        /**
         * @name _actionElement
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * The HTMLElement for the control's action.
         */
        protected _actionElement: HTMLElement;

        /**
         * @name _type
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The control's type (e.g. - "email").
         */
        protected _type: string;

        /**
         * @name _pattern
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string to regulate what text is allowed to be entered.
         */
        protected _pattern: RegExp;

        /**
         * @name _typeChar
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The control's type character (e.g. - an "x" to delete 
         * input text).
         */
        protected _typeChar: string;

        /**
         * @name _typeHandler
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {EventListener}
         * 
         * @description
         * A function to handle the type event.
         */
        protected _typeHandler: EventListener;

        /**
         * @name _actionHandler
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {() => void}
         * 
         * @description
         * A function to check the current action state and handle accordingly.
         */
        protected _actionHandler: () => void;

        /**
         * @name _inTouch
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the user is currently touching the screen.
         */
        protected _inTouch = false;

        /**
         * @name _inAction
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether the user is currently in the process of performing the {@link platui.Input|Input's} action.
         */
        protected _inAction = false;

        /**
         * @name _usingBind
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control is being used.
         */
        protected _usingBind = false;

        /**
         * @name _loaded
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the {@link plat.controls.Bind|Bind} control has been loaded.
         */
        protected _loaded = false;

        /**
         * @name _preloadedValue
         * @memberof platui.Input
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * A value specified prior to the control being loaded.
         */
        protected _preloadedValue = '';

        /**
         * @name setClasses
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Input + ' ' + (className || ''));
        }

        /**
         * @name initialize
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Set all HTMLElement references and potential attribute controls.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var element = this.element,
                image = this._imageElement = <HTMLElement>element.firstElementChild.firstElementChild,
                input = this._inputElement = <HTMLInputElement>image.nextElementSibling,
                attributes = element.attributes,
                length = attributes.length,
                hasPlaceholder = false,
                attrRegex = /plat-(?!control|hide|options)/,
                attribute: Attr,
                $utils = this.$utils,
                name: string;

            for (var i = 0; i < length; ++i) {
                attribute = attributes[i];
                name = attribute.name;
                if (attrRegex.test(name)) {
                    if (name === __Bind || name === 'data-' + __Bind) {
                        this._usingBind = true;
                    } else {
                        input.setAttribute(name, attribute.value);
                    }
                } else if (name === 'type') {
                    this._type = attribute.value;
                } else if (name === 'placeholder') {
                    input.placeholder = attribute.value;
                    hasPlaceholder = true;
                }
            }

            if (hasPlaceholder) {
                return;
            }

            var placeholder = this.innerTemplate.textContent.replace(/\r|\n/g, '');
            if (!$utils.isEmpty(placeholder)) {
                input.placeholder = placeholder;
            }
        }

        /**
         * @name loaded
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Set the style and initialize the action.
         * 
         * @returns {void}
         */
        loaded(): void {
            var optionObj = this.options || <plat.observable.IObservableProperty<IInputOptions>>{},
                options = optionObj.value || <IInputOptions>{},
                element = this.element,
                type = this._type = this._type || options.type || 'text',
                pattern = options.pattern;

            this.dom.addClass(element, __Plat + type);
            this._actionElement = <HTMLElement>this._inputElement.nextElementSibling;

            if (this.$utils.isString(pattern)) {
                if (pattern[0] === '/' && pattern[pattern.length - 1] === '/') {
                    pattern = pattern.slice(1, -1);
                }

                this._pattern = new RegExp(pattern);
            }

            this._initializeType();
            this._loaded = true;
        }

        /**
         * @name dispose
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Sets loaded back to false to avoid acting on input.
         * 
         * @returns {void}
         */
        dispose(): void {
            this._loaded = false;
        }

        /**
         * @name validate
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * A function to validate the user's input. For action="email" it returns 
         * true if the email can be a valid email address. For all other 
         * actions it returns true if the input is not empty.
         * 
         * @returns {boolean} Whether or not the user's input is valid.
         */
        validate(): boolean {
            return this._pattern.test(this._inputElement.value);
        }

        /**
         * @name clear
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Clears the user's input.
         * 
         * @returns {void}
         */
        clear(): void {
            var inputElement = this._inputElement,
                value = inputElement.value;

            if (value === '') {
                return;
            }

            var actionElement = this._actionElement;
            this.propertyChanged((inputElement.value = ''), value);
            actionElement.textContent = this._typeChar = '';
            actionElement.setAttribute(__Hide, '');
        }

        /**
         * @name focus
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Focuses the input.
         * 
         * @returns {void}
         */
        focus(): void {
            this._inputElement.focus();
        }

        /**
         * @name blur
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Blurs the input.
         * 
         * @returns {void}
         */
        blur(): void {
            this._inputElement.blur();
        }

        /**
         * @name value
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * Returns the current value of {@link platui.Input|Input} control.
         * 
         * @returns {string} The current value of the {@link platui.Input|Input} control.
         */
        value(): string {
            return this._inputElement.value;
        }

        /**
         * @name setProperty
         * @memberof platui.Input
         * @kind function
         * @access public
         * 
         * @description
         * The function called when the bindable property is set externally.
         * 
         * @param {any} newValue The new value of the bindable property.
         * @param {any} oldValue? The old value of the bindable property.
         * 
         * @returns {void}
         */
        setProperty(newValue: any, oldValue?: any): void {
            if (newValue === oldValue) {
                return;
            }

            if (!this._loaded) {
                this._preloadedValue = newValue;
                return;
            }

            this._onInputChanged(newValue);
        }

        /**
         * @name _initializeType
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes the type.
         * 
         * @returns {void}
         */
        protected _initializeType(): void {
            var type = this._type,
                event = __$tap,
                actionElement = this._actionElement;

            switch (type) {
                case 'email':
                    this._pattern = this._pattern || this.$regex.validateEmail;
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
                    this._pattern = this._pattern || this.$regex.validateTelephone;
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
        }

        /**
         * @name _addEventListeners
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners to the input and action element.
         * 
         * @param {string} event The primary action element's event.
         * 
         * @returns {void}
         */
        protected _addEventListeners(event: string): void {
            var actionElement = this._actionElement,
                input = this._inputElement,
                actionEnd = () => (this._inAction = false);

            this.addEventListener(actionElement, event, this._typeHandler, false);
            this.addEventListener(actionElement, __$touchstart, () => (this._inAction = true), false);
            this.addEventListener(actionElement, __$touchend, actionEnd, false);
            this.addEventListener(actionElement, __$trackend, actionEnd, false);
            this.addEventListener(input, 'focus', () => {
                if (input.value === '') {
                    return;
                }
                actionElement.removeAttribute(__Hide);
            }, false);
            this.addEventListener(input, 'blur', (ev: Event) => {
                if (this._inAction) {
                    return;
                }
                actionElement.setAttribute(__Hide, '');
            }, false);

            if (this._usingBind) {
                this._checkInput(this._preloadedValue);
            }

            this._addTextEventListener();
        }

        /**
         * @name _addTextEventListener
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Adds a text event listener to the input element.
         * 
         * @returns {void}
         */
        protected _addTextEventListener(): void {
            var input = this._inputElement,
                $compat = this.$compat,
                $utils = this.$utils,
                composing = false,
                timeout: plat.IRemoveListener,
                eventListener = () => {
                    if (composing) {
                        return;
                    }

                    this._onInput();
                },
                postponedEventListener = () => {
                    if ($utils.isFunction(timeout)) {
                        return;
                    }

                    timeout = $utils.postpone(() => {
                        eventListener();
                        timeout = null;
                    });
                };

            if ($utils.isUndefined($compat.ANDROID)) {
                this.addEventListener(input, 'compositionstart', () => (composing = true), false);
                this.addEventListener(input, 'compositionend', () => {
                    composing = false;
                    eventListener();
                }, false);
            }

            if ($compat.hasEvent('input')) {
                this.addEventListener(input, 'input', eventListener, false);
            } else {
                this.addEventListener(input, 'keydown', (ev: KeyboardEvent) => {
                    var key = ev.keyCode;

                    if (key === 91 ||
                        key === 92 ||
                        (key > 15 && key < 28) ||
                        (key > 32 && key < 41)) {
                        return;
                    }

                    postponedEventListener();
                }, false);
                this.addEventListener(input, 'cut', postponedEventListener, false);
                this.addEventListener(input, 'paste', postponedEventListener, false);
            }

            this.addEventListener(input, 'change', eventListener, false);
        }

        /**
         * @name _erase
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Clears the user's input and focuses the input element.
         * 
         * @returns {void}
         */
        protected _erase(): void {
            this.clear();
            this.focus();
        }

        /**
         * @name _handlePasswordShow
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The action handler for the "password" type when showing the 
         * password text.
         * 
         * @returns {void}
         */
        protected _handlePasswordShow(): void {
            this._inTouch = true;
            this._inputElement.type = 'text';
        }

        /**
         * @name _handlePasswordHide
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The action handler for the "password" type when hiding the 
         * password text.
         * 
         * @returns {void}
         */
        protected _handlePasswordHide(): void {
            if (!this._inTouch) {
                return;
            }
            this._inTouch = false;

            var inputElement = this._inputElement;
            inputElement.type = this._type;
            inputElement.focus();
        }

        /**
         * @name _handleEmail
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The action handler for the "email" type.
         * 
         * @returns {void}
         */
        protected _handleEmail(): void {
            var inputElement = this._inputElement,
                value = inputElement.value,
                char = this._typeChar;

            this.propertyChanged((inputElement.value = (char === 'x' ? '' : value + char)), value);
            this._checkEmail();
            inputElement.focus();
        }

        /**
         * @name _checkText
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the current state of the default action and handles accordingly.
         * 
         * @returns {void}
         */
        protected _checkText(): void {
            var char = this._typeChar;

            if (char === 'x') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            } else if (this._inputElement.value !== '') {
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
        }

        /**
         * @name _checkPassword
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the current state of the password action and handles accordingly.
         * 
         * @returns {void}
         */
        protected _checkPassword(): void {
            var char = this._typeChar;

            if (char === '?') {
                if (this._inputElement.value === '') {
                    this._typeChar = '';
                }
            } else if (this._inputElement.value !== '') {
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
        }

        /**
         * @name _checkEmail
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Checks the current state of the "email" action and handles accordingly.
         * 
         * @returns {void}
         */
        protected _checkEmail(): void {
            var value = this._inputElement.value,
                char = this._typeChar;

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
                    } else if (value.indexOf('.com') !== -1) {
                        this._typeChar = 'x';
                    }
                    break;
                case 'x':
                    if (value === '') {
                        this._typeChar = '';
                    } else if (value.indexOf('@') === -1) {
                        this._typeChar = '@';
                    } else if (value.indexOf('.com') === -1) {
                        this._typeChar = '.com';
                    }
                    break;
                default:
                    if (value === '') {
                        this._typeChar = '';
                    } else if (value.indexOf('@') === -1) {
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
        }

        /**
         * @name _onInput
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The event handler upon user text input.
         * 
         * @returns {void}
         */
        protected _onInput(): void {
            var inputElement = this._inputElement,
                value = inputElement.value;
            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = value.length - 1;
                    if (last >= 0 && (!this._pattern.test(value[last]) ||
                        !(last === 0 || this._type !== 'tel' || value[last] !== '+'))) {
                        value = inputElement.value = value.slice(0, -1);
                    }
                default:
                    this.propertyChanged(value);
                    break;
            }

            this._actionHandler();
        }

        /**
         * @name _onInputChanged
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * The event handler upon bound text being changed.
         * 
         * @param {string} newValue The new value of the bound text.
         * 
         * @returns {void}
         */
        protected _onInputChanged(newValue: string): void {
            var inputElement = this._inputElement;
            if (newValue === inputElement.value) {
                return;
            }

            switch (this._type) {
                case 'tel':
                case 'number':
                    var last = newValue.length - 1;
                    if (last >= 0 && (!this._pattern.test(newValue[last]) ||
                        !(last === 0 || this._type !== 'tel' || newValue[last] !== '+'))) {
                        newValue = inputElement.value = newValue.slice(0, -1);
                        this.propertyChanged(newValue);
                        break;
                    }
                default:
                    inputElement.value = newValue;
                    break;
            }

            this._actionHandler();
        }

        /**
         * @name _checkInput
         * @memberof platui.Input
         * @kind function
         * @access protected
         * 
         * @description
         * Check the initial input and delete if it does not match the pattern.
         * 
         * @param {string} value The value to check as input to the HTMLInputElement.
         * 
         * @returns {void}
         */
        protected _checkInput(value: string): void {
            switch (this._type) {
                case 'tel':
                case 'number':
                    if (this._pattern.test(value)) {
                        this._inputElement.value = value;
                    } else {
                        if (this._usingBind) {
                            var Exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic);
                            Exception.warn(this.type + ' control is bound to a value that does not satisfy ' +
                                'the given pattern and/or type. The bound value will be reset to "".');
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
        }
    }

    plat.register.control(__Input, Input);

    /**
     * @name IInputOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Input|Input} control.
     */
    export interface IInputOptions {
        /**
         * @name type
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The type of the {@link platui.Input|Input} control. 
         * Defaults to "text".
         * 
         * @remarks
         * - "text"
         * - "password"
         * - "email"
         * - "number"
         * - "tel"/"telephone"
         */
        type?: string;

        /**
         * @name pattern
         * @memberof platui.IInputOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * A regular expression string to regulate what text is allowed to be entered.
         */
        pattern?: string;
    }

    /**
     * @name Carousel
     * @memberof platui
     * @kind class
     * 
     * @extends {plat.ui.TemplateControl}
     * @implements {platui.IUIControl}
     * 
     * @description
     * An {@link plat.ui.ITemplateControl|ITemplateControl} that acts as a HTML template carousel.
     */
    export class Carousel extends plat.ui.TemplateControl implements IUIControl {
        
        /**
         * @name $utils
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.IUtils}
         * 
         * @description
         * Reference to the {@link plat.IUtils|IUtils} injectable.
         */
        $utils: plat.IUtils = plat.acquire(__Utils);
        
        /**
         * @name $compat
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.ICompat}
         * 
         * @description
         * Reference to the {@link plat.ICompat|ICompat} injectable.
         */
        $compat: plat.ICompat = plat.acquire(__Compat);
        
        /**
         * @name $document
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {Document}
         * 
         * @description
         * Reference to the Document injectable.
         */
        $document: Document = plat.acquire(__Document);
        
        /**
         * @name $window
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {Window}
         * 
         * @description
         * Reference to the Window injectable.
         */
        $window: Window = plat.acquire(__Window);
        
        /**
         * @name $animator
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.ui.animations.IAnimator}
         * 
         * @description
         * Reference to the {@link plat.ui.animations.IAnimator|IAnimator} injectable.
         */
        $animator: plat.ui.animations.IAnimator = plat.acquire(__Animator);

        /**
         * @name templateString
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The HTML template represented as a string.
         */
        templateString = '<plat-foreach class="plat-carousel-container"></plat-foreach>';

        /**
         * @name context
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {Array<any>}
         * 
         * @description
         * The mandatory type of context of the {@link platui.Carousel|Carousel}.
         */
        context: Array<any>;

        /**
         * @name options
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.observable.IObservableProperty<platui.ICarouselOptions>}
         * 
         * @description
         * The evaluated {@link plat.controls.Options|plat-options} object.
         */
        options: plat.observable.IObservableProperty<ICarouselOptions>;

        /**
         * @name itemsLoaded
         * @memberof platui.Carousel
         * @kind property
         * @access public
         * 
         * @type {plat.async.IThenable<void>}
         * 
         * @description
         * A Promise that fulfills when the items are loaded.
         */
        itemsLoaded: plat.async.IThenable<void>;

        /**
         * @name _orientation
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The orientation of this control.
         */
        protected _orientation: string;

        /**
         * @name _transform
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * The current browser's CSS3 transform property.
         */
        protected _transform: string;

        /**
         * @name _hasSwiped
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user has swiped.
         */
        protected _hasSwiped = false;

        /**
         * @name _inTouch
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the user is currently touching the screen.
         */
        protected _inTouch: boolean;

        /**
         * @name _lastTouch
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.IPoint}
         * 
         * @description
         * The last touch start recorded.
         */
        protected _lastTouch: plat.ui.IPoint = { x: 0, y: 0 };

        /**
         * @name _loaded
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * Whether or not the control has been loaded based on its context being an Array.
         */
        protected _loaded = false;

        /**
         * @name _index
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current index seen in the {@link platui.Carousel|Carousel}.
         */
        protected _index = 0;

        /**
         * @name _intervalOffset
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The interval offset to translate the {@link platui.Carousel|Carousel's} sliding element.
         */
        protected _intervalOffset: number;

        /**
         * @name _currentOffset
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current offset of the translated {@link platui.Carousel|Carousel's} sliding element.
         */
        protected _currentOffset = 0;

        /**
         * @name _positionProperty
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {string}
         * 
         * @description
         * Denotes whether we're using left or top as the position of the {@link platui.Carousel|Carousel}.
         */
        protected _positionProperty: string;

        /**
         * @name _slider
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {HTMLElement}
         * 
         * @description
         * Denotes the sliding element contained within the control.
         */
        protected _slider: HTMLElement;

        /**
         * @name _cloneAttempts
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {number}
         * 
         * @description
         * The current number of times we checked to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _cloneAttempts = 0;

        /**
         * @name _maxCloneCount
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {boolean}
         * 
         * @description
         * The max number of times we'll check to see if the element was placed into the DOM. 
         * Used for determining max offset width.
         */
        protected _maxCloneAttempts = 25;

        /**
         * @name _animationThenable
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {plat.ui.animations.IAnimationThenable<void>}
         * 
         * @description
         * The most recent animation thenable. Used to cancel the current animation if another needs 
         * to begin.
         */
        protected _animationThenable: plat.ui.animations.IAnimationThenable<void>;

        /**
         * @name _onLoad
         * @memberof platui.Carousel
         * @kind property
         * @access protected
         * 
         * @type {() => void}
         * 
         * @description
         * A function to call once items are loaded and the {@link platui.Carousel|Carousel} is set.
         */
        protected _onLoad: () => void;

        /**
         * @name setClasses
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Sets the classes on the proper elements.
         * 
         * @param {string} className? An optional, additional class name or class names to set on the control 
         * in addition to its standard set.
         * @param {Element} element? The element to set the class name on. Should default to 
         * the control's element if not specified.
         * 
         * @returns {void}
         */
        setClasses(className?: string, element?: Element): void {
            this.dom.addClass(element || this.element, __Carousel + ' ' + (className || ''));
        }

        /**
         * @name contextChanged
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Checks if the control has been initialized, otherwise it does so.
         * 
         * @returns {void}
         */
        contextChanged(): void {
            if (this._loaded) {
                return;
            }

            this.loaded();
        }

        /**
         * @name initialize
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Set the class name.
         * 
         * @returns {void}
         */
        initialize(): void {
            this.setClasses();
        }

        /**
         * @name setTemplate
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Inserts the innerHTML of this control into a child {@link plat.ui.controls.ForEach|ForEach} control.
         * 
         * @returns {void}
         */
        setTemplate(): void {
            var itemContainer = this.$document.createElement('div');
            itemContainer.className = 'plat-carousel-item';
            itemContainer.appendChild(this.innerTemplate);
            this.element.firstElementChild.appendChild(itemContainer);
        }

        /**
         * @name loaded
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Checks context and warns if not an Array, then initializes.
         * 
         * @returns {void}
         */
        loaded(): void {
            var $utils = this.$utils,
                context = this.context;
            if (!$utils.isArray(context)) {
                var Exception = plat.acquire(__ExceptionStatic);
                Exception.warn('The context of a ' + this.type + ' must be an Array.');
                return;
            }

            var optionObj = this.options || <plat.observable.IObservableProperty<IDrawerControllerOptions>>{},
                options = optionObj.value || <IDrawerControllerOptions>{},
                orientation = this._orientation = options.orientation || 'horizontal',
                index = options.index;

            this.dom.addClass(this.element, __Plat + orientation);
            index = $utils.isNumber(index) && index >= 0 ? index < context.length ? index : (context.length - 1) : 0;
            this._onLoad = () => {
                this.goToIndex(index);
                this._addEventListeners(orientation);
            };
            this._init();
            this._loaded = true;
        }

        /**
         * @name goToNext
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Advances the position of the {@link platui.Carousel|Carousel} to the next state.
         * 
         * @returns {void}
         */
        goToNext(): void {
            if (this._index >= this.context.length - 1) {
                return;
            }

            this._index++;

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(-this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });
        }

        /**
         * @name goToPrevious
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Changes the position of the {@link platui.Carousel|Carousel} to the previous state.
         * 
         * @returns {void}
         */
        goToPrevious(): void {
            if (this._index <= 0) {
                return;
            }

            this._index--;

            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(this._intervalOffset);
            this._initiateAnimation({ properties: animationOptions });
        }

        /**
         * @name goToIndex
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Changes the position of the {@link platui.Carousel|Carousel} to the state 
         * specified by the input index.
         * 
         * @param {number} index The new index of the {@link platui.Carousel|Carousel}.
         * 
         * @returns {void}
         */
        goToIndex(index: number): void {
            if (index === this._index || index < 0 || index >= this.context.length) {
                return;
            }

            var animationOptions: plat.IObject<string> = {},
                interval = (this._index - index) * this._intervalOffset;

            this._index = index;
            animationOptions[this._transform] = this._calculateStaticTranslation(interval);
            this._initiateAnimation({ properties: animationOptions });
        }

        /**
         * @name reset
         * @memberof platui.Carousel
         * @kind function
         * @access public
         * 
         * @description
         * Resets the position of the {@link platui.Carousel|Carousel} to its current state.
         * 
         * @returns {void}
         */
        reset(): void {
            var animationOptions: plat.IObject<string> = {};
            animationOptions[this._transform] = this._calculateStaticTranslation(0);
            this._initiateAnimation({ properties: animationOptions });
        }

        /**
         * @name _initiateAnimation
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Animates the carousel with a set of characteristics passed in as an argument.
         * 
         * @param {plat.IObject<string>} animationOptions An object containing key-value pairs 
         * of properties to animate.
         * 
         * @returns {void}
         */
        protected _initiateAnimation(animationOptions: plat.ui.animations.ISimpleCssTransitionOptions): void {
            if (!this.$utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(() => {
                    this._animationThenable = this.$animator.animate(this._slider, __Transition, animationOptions).then(() => {
                        this._animationThenable = null;
                    });
                });

                return;
            }

            this._animationThenable = this.$animator.animate(this._slider, __Transition, animationOptions).then(() => {
                this._animationThenable = null;
            });
        }

        /**
         * @name _init
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Initializes the control and adds all event listeners.
         * 
         * @returns {void}
         */
        protected _init(): void {
            var foreach = <plat.ui.controls.ForEach>this.controls[0];
            this._setTransform();
            this._slider = <HTMLElement>this.element.firstElementChild;

            this.itemsLoaded = foreach.itemsLoaded.then(() => {
                this._setPosition();
                if (!this._intervalOffset) {
                    this._setOffsetWithClone();
                } else {
                    this._onLoad();
                }
            }).catch(() => {
                    var Exception = plat.acquire(__ExceptionStatic);
                    Exception.warn('Error processing ' + this.type + '. Please ensure you\'re context is correct.');
                    this._loaded = false;
                    return;
                });
        }

        /**
         * @name _addEventListeners
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Adds all event listeners on this control's element.
         * 
         * @param {string} orientation The orientation of the {@link platui.Carousel|Carousel}.
         * 
         * @returns {void}
         */
        protected _addEventListeners(orientation: string): void {
            var element = this.element,
                trackFn = this._track,
                touchEnd = this._touchEnd,
                track: string,
                reverseTrack: string;

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

            this.addEventListener(element, track, trackFn, false);
            this.addEventListener(element, reverseTrack, trackFn, false);
            this.addEventListener(element, __$touchstart, this._touchStart, false);
            this.addEventListener(element, __$trackend, touchEnd, false);
            this.addEventListener(element, __$touchend, touchEnd, false);
        }

        /**
         * @name _touchStart
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Log when the user touches the {@link platui.Carousel|Carousel}.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _touchStart(ev: plat.ui.IGestureEvent): void {
            if (this._inTouch) {
                return;
            }

            if (!this.$utils.isNull(this._animationThenable)) {
                this._animationThenable = this._animationThenable.cancel().then(() => {
                    this._inTouch = true;
                    this._lastTouch = {
                        x: ev.clientX,
                        y: ev.clientY
                    };

                    this._animationThenable = null;
                });
                return;
            }

            this._inTouch = true;
            this._lastTouch = {
                x: ev.clientX,
                y: ev.clientY
            };
        }

        /**
         * @name _touchEnd
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * The $touchend and $trackend event handler.
         * 
         * @param {plat.ui.IGestureEvent} ev The touch event.
         * 
         * @returns {void}
         */
        protected _touchEnd(ev: plat.ui.IGestureEvent): void {
            var inTouch = this._inTouch,
                hasSwiped = this._hasSwiped;

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
                } else if (this._index > 0) {
                    this.goToPrevious();
                    return;
                }
            }

            this.reset();
        }

        /**
         * @name _track
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * The $track event handler. Used for tracking only horizontal or vertical tracking motions  
         * depending on the defined orientation.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {void}
         */
        protected _track(ev: plat.ui.IGestureEvent): void {
            this._slider.style[<any>this._transform] = this._calculateDynamicTranslation(ev);
        }

        /**
         * @name _calculateStaticTranslation
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the translation value for setting the transform value during a static index set.
         * 
         * @param {number} interval The interval change.
         * 
         * @returns {string} The translation value.
         */
        protected _calculateStaticTranslation(interval: number): string {
            if (this._orientation === 'vertical') {
                return 'translate3d(0,' + (this._currentOffset += interval) + 'px,0)';
            }

            return 'translate3d(' + (this._currentOffset += interval) + 'px,0,0)';
        }

        /**
         * @name _calculateDynamicTranslation
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Calculates the translation value for setting the transform value during tracking.
         * 
         * @param {plat.ui.IGestureEvent} ev The $tracking event.
         * 
         * @returns {string} The translation value.
         */
        protected _calculateDynamicTranslation(ev: plat.ui.IGestureEvent): string {
            if (this._orientation === 'vertical') {
                return 'translate3d(0,' + (this._currentOffset + (ev.clientY - this._lastTouch.y)) + 'px,0)';
            }

            return 'translate3d(' + (this._currentOffset + (ev.clientX - this._lastTouch.x)) + 'px,0,0)';
        }

        /**
         * @name _setTransform
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Obtains the current browser's transform property value.
         * 
         * @returns {void}
         */
        protected _setTransform(): void {
            var style = this.element.style,
                isUndefined = this.$utils.isUndefined,
                transform: string;

            if (isUndefined(style.transform)) {
                var vendorPrefix = this.$compat.vendorPrefix;
                if (!isUndefined(style[<any>(vendorPrefix.lowerCase + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                } else if (!isUndefined(style[<any>(vendorPrefix.js + 'Transform')])) {
                    transform = this._transform = vendorPrefix.lowerCase + 'Transform';
                }
            } else {
                transform = this._transform = 'transform';
            }
        }

        /**
         * @name _setPosition
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Sets the properties to use for position and sets the interval length of the sliding container.
         * 
         * @param {HTMLElement} element? The element to base the length off of.
         * 
         * @returns {number} The interval length.
         */
        protected _setPosition(element?: HTMLElement): number {
            element = element || <HTMLElement>this.element.firstElementChild;
            switch (this._orientation) {
                case 'vertical':
                    this._positionProperty = 'top';
                    return (this._intervalOffset = element.offsetHeight);
                default:
                    this._positionProperty = 'left';
                    return (this._intervalOffset = element.offsetWidth);
            }
        }

        /**
         * @name _setOffsetWithClone
         * @memberof platui.Carousel
         * @kind function
         * @access protected
         * 
         * @description
         * Creates a clone of this element and uses it to find the max offset.
         * 
         * @returns {void}
         */
        protected _setOffsetWithClone(): void {
            var element = this.element,
                body = this.$document.body;

            if (!body.contains(element)) {
                var cloneAttempts = ++this._cloneAttempts;
                if (cloneAttempts === this._maxCloneAttempts) {
                    var $exception: plat.IExceptionStatic = plat.acquire(__ExceptionStatic),
                        type = this.type;
                    $exception.warn('Max clone attempts reached before the ' + type + ' was placed into the ' +
                        'DOM. Disposing of the ' + type);
                    (<plat.ui.ITemplateControlFactory>plat.acquire(__TemplateControlFactory)).dispose(this);
                    return;
                }

                this.$utils.postpone(this._setOffsetWithClone, null, this);
                return;
            }

            this._cloneAttempts = 0;

            var clone = <HTMLElement>element.cloneNode(true),
                regex = /\d+(?!\d+|%)/,
                $window = this.$window,
                parentChain = <Array<HTMLElement>>[],
                shallowCopy = clone,
                computedStyle: CSSStyleDeclaration,
                width: string;

            shallowCopy.id = '';
            while (!regex.test((width = (computedStyle = $window.getComputedStyle(element)).width))) {
                if (computedStyle.display === 'none') {
                    shallowCopy.style.setProperty('display', 'block', 'important');
                }
                shallowCopy.style.setProperty('width', width, 'important');
                element = element.parentElement;
                shallowCopy = <HTMLElement>element.cloneNode(false);
                shallowCopy.id = '';
                parentChain.push(shallowCopy);
            }

            if (parentChain.length > 0) {
                var curr = parentChain.pop(),
                    currStyle = curr.style,
                    temp: HTMLElement;

                while (parentChain.length > 0) {
                    temp = parentChain.pop();
                    curr.insertBefore(temp, null);
                    curr = temp;
                }

                curr.insertBefore(clone, null);
            }

            var shallowStyle = shallowCopy.style;
            shallowStyle.setProperty('width', width, 'important');
            shallowStyle.setProperty('visibility', 'hidden', 'important');
            body.appendChild(shallowCopy);
            this._setPosition(<HTMLElement>clone.firstElementChild);
            body.removeChild(shallowCopy);
            this._onLoad();
        }
    }

    plat.register.control(__Carousel, Carousel);

    /**
     * @name ICarouselOptions
     * @memberof platui
     * @kind interface
     * 
     * @description
     * The available {@link plat.controls.Options|options} for the {@link platui.Carousel|Carousel} control.
     */
    export interface ICarouselOptions {
        /**
         * @name orientation
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {string}
         * 
         * @description
         * The swipe direction of the {@link platui.Carousel|Carousel}. 
         * Defaults to "horizontal".
         * 
         * @remarks
         * - "horizontal" - horizontal control.
         * - "vertical" - vertical control.
         */
        orientation?: string;

        /**
         * @name index
         * @memberof platui.ICarouselOptions
         * @kind property
         * @access public
         * 
         * @type {number}
         * 
         * @description
         * The starting index of the {@link platui.Carousel|Carousel}.
         */
        index?: number;
    }
}
/* tslint:enable */
