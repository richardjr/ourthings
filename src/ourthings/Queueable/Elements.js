/** @module ourthings/Queueable/Elements */
import Queueable from "../Queueable";
import {Validate, ValidateEmail, ValidatePassword, ValidateText} from "../Validator";

/**
 * @classdesc
 *
 * Dom Elements manipulations
 *
 * @author Richard Reynolds richard@nautoguide.com
 *
 * @example
 * elements.removeClass({"targetId":".leftPanel","class":"hidden"});
 *
 */
export default class Elements extends Queueable {

	/**
	 * Add a class to a dom element
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.iframeId - iframe target
	 * @param {string} json.targetId - Dom target
	 * @param {string} json.class - Name of class to add
	 *
	 * @example
	 * elements.addClass({"targetId":".leftPanel","class":"hidden"});
	 */
	addClass(pid,json) {
		let self=this;
		let elements=self.queue.getIframeElements(json.iframeId,json.targetId);
		self.set(pid,json);

		if(elements!==false) {
			elements.forEach(function(element) {
				element.classList.add(json.class);
			});
			self.finished(pid,self.queue.DEFINE.FIN_OK);
		} else {
			self.finished(pid,self.queue.DEFINE.FIN_WARNING,'Could not add class ['+json.class+'] to ['+json.targetId+']');
		}
	}

	/**
	 * Set style of a dom element
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.iframeId - iframe target
	 * @param {string} json.targetId - Dom target
	 * @param {array} json.style - style array of elements in format [{"name":"background","value":"red"}]
	 *
	 * @example
	 * elements.setStyle({"targetId":".leftPanel","style":[{"name":"background","value":"red"}]});
	 */
	setStyle(pid,json) {
		let self=this;
		let elements=self.queue.getIframeElements(json.iframeId,json.targetId);
		self.set(pid,json);

		if(elements!==false) {
			elements.forEach(function(element) {
				for(let i in json.style)
				element.style[json.style[i].name]=json.style[i].value;
			});
			self.finished(pid,self.queue.DEFINE.FIN_OK);
		} else {
			self.finished(pid,self.queue.DEFINE.FIN_WARNING,'Could not set style on ['+json.targetId+']');
		}
	}

	/**
	 * Set attribute of a dom element
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.iframeId - iframe target
	 * @param {string} json.targetId - Dom target
	 * @param {array} json.attribute - Attribute to set
	 * @param {array} json.value - Value to set
	 *
	 * @example
	 * elements.setAttribute({"targetId":".leftPanel","attribute":"src","value":"http://foo/bar.png"});
	 */
	setAttribute(pid,json) {
		let self=this;
		let elements=self.queue.getIframeElements(json.iframeId,json.targetId);
		self.set(pid,json);

		if(elements!==false) {
			elements.forEach(function(element) {
					element.setAttribute(json.attribute,json.value);
			});
			self.finished(pid,self.queue.DEFINE.FIN_OK);
		} else {
			self.finished(pid,self.queue.DEFINE.FIN_WARNING,'Could not set attribute ['+json.attribute+'] on ['+json.targetId+']');
		}
	}

	/**
	 * Remove a class to a dom element
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.iframeId - iframe target
	 * @param {string} json.targetId - Dom target
	 * @param {string} json.class - Name of class to remove
	 *
	 * @example
	 * elements.removeClass({"targetId":".leftPanel","class":"hidden"});
	 */
	removeClass(pid,json) {
		let self=this;
		let elements=self.queue.getIframeElements(json.iframeId,json.targetId);
		self.set(pid,json);
		if(elements!==false) {
			elements.forEach(function(element) {
				element.classList.remove(json.class);
			});
			self.finished(pid,self.queue.DEFINE.FIN_OK);
		} else {
			self.finished(pid,self.queue.DEFINE.FIN_WARNING,'Could not remove class ['+json.class+'] to ['+json.targetId+']');
		}
	}

	/**
	 * toggle a class on a dom element
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target
	 * @param {string} json.class - Name of class to toggle
	 *
	 * @example
	 * elements.toggleClass({"targetId":".leftPanel","class":"hidden"});
	 */
	toggleClass(pid,json) {
		let self=this;
		let elements=self.queue.getIframeElements(json.iframeId,json.targetId);
		self.set(pid,json);
		if(elements!==false) {
			elements.forEach(function(element) {
				if (element.classList.contains(json.class))
					element.classList.remove(json.class);
				else
					element.classList.add(json.class);
			});
			self.finished(pid,self.queue.DEFINE.FIN_OK);
		} else {
			self.finished(pid,self.queue.DEFINE.FIN_WARNING,'Could not remove class ['+json.class+'] to ['+json.targetId+']');
		}
	}

	/**
	 * Cut a dom element out and paste it somewhere
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target
	 * @param {string} json.sourceId - Source dom element
	 *
	 * @example
	 * elements.domCutPaste({"targetId":".leftPanel","sourceId":".thing"});
	 */
	domCutPaste(pid, json) {
		let source=self.queue.getElement(json.sourceId);
		let target=self.queue.getElement(json.targetId);
		target.appendChild(source);
		this.finished(pid,self.queue.DEFINE.FIN_OK);
	}

    /**
     * Set the HTML of an element
     * @param {number} pid - Process ID
     * @param {object} json - queue arguments
     * @param {string} json.targetId - Dom target
     * @param {string} json.html - HTML to add
     * @param {string} json.append - Append mode
     *
     * @example
     * elements.innerHTML({"targetId":".leftPanel","html":"Hello World"});

     */
	innerHTML(pid,json) {
		let self=this;
		let element=self.queue.getElement(json.targetId);
		if(json.append)
			element.insertAdjacentHTML('beforeend',json.html);
		else
			element.innerHTML=json.html;
		self.finished(pid,self.queue.DEFINE.FIN_OK);
	}

	/**
	 * Set the value of an input field
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target
	 * @param {string} json.value - value to set
	 *
	 * @example
	 * elements.setInputValue({"targetId":"#username","value":"Hello World"});

	 */
	setInputValue(pid,json) {
		let self=this;
		let element=self.queue.getElement(json.targetId);
		element.value=json.value;
		self.finished(pid,self.queue.DEFINE.FIN_OK);
	}

	/**
	 * Get the values from checked input boxes
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target for check boxes
	 * @param {string} json.mode - array|string
	 * @param {string} json.separator - What seperator to use in string mode
	 * @param {string} json.name - Name of the memory element to set
	 *
	 *
	 * @example
	 * elements.getCheckBoxValues({"mode":"string","targetId":".functionGetTypes"});

	 */
	getCheckBoxValues(pid,json) {
		let self=this;
		let options=Object.assign({
			"mode":"array",
			"separator":",",
			"name":"checkboxes"
		},json);
		let results=[];
		let elements=self.queue.getElements(json.targetId+':checked');
		for(let element in elements) {
			results.push(elements[element].value);
		}
		if(options.mode!=='array') {
			results=results.join(options.separator);
		}
		self.queue.setMemory(options.name, results, "Session");
		self.finished(pid,self.queue.DEFINE.FIN_OK);

	}

	/**
	 * Get the computed style for an element
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target
	 * @param {string} json.styles - value to get
	 * @param {string} json.name - memory name to use
	 *
	 * @example
	 * elements.getComputedStyle({"targetId":"#username","styles":"background"});

	 */
	getComputedStyle(pid,json) {
		let self=this;
		let options=Object.assign({
			"name":"computedStyle"
		},json);
		let element=self.queue.getElement(options.targetId);
		let style=window.getComputedStyle(element).getPropertyValue(options.css);
		self.queue.setMemory(options.name, style, "Session");
		self.finished(pid,self.queue.DEFINE.FIN_OK);
	}

	/**
	 * Scroll to a dom target
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target
	 *
	 * @example
	 * elements.scrollIntoView({"targetId":"#ps_1"});

	 */
	scrollIntoView(pid,json) {
		let self=this;
		let element=self.queue.getElement(json.targetId);
		element.scrollIntoView();
		self.finished(pid,self.queue.DEFINE.FIN_OK);
	}

	/**
	 * Scroll to bottom of a dom target
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target
	 *
	 * @example
	 * elements.scrollToBottom({"targetId":"#ps_1"});

	 */
	scrollToBottom(pid,json) {
		let objDiv = this.queue.getElement(json.targetId);
		objDiv.scrollTop = objDiv.scrollHeight;
		this.finished(pid,this.queue.DEFINE.FIN_OK);
	}

	/**
	 * Accessible toggle visible on a target
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target to scroll to*
	 * @param {string} json.mode - toggle|add|remove
	 * @example
	 * elements.focus({"targetId":"#ps_1"});
	 */
	ariaHiddenToggle(pid, json) {
		let self=this;
		let options=Object.assign({
			"class":"hidden",
			"mode":"toggle"
		},json);
		let elements=self.queue.getIframeElements(options.iframeId,options.targetId);
		if(elements!==false) {
			elements.forEach(function(element) {
				if(options.mode==="toggle") {
					if (element.classList.contains(options.class)) {
						element.classList.remove(options.class);
						element.setAttribute('aria-hidden', 'false');
					} else {
						element.classList.add(options.class);
						element.setAttribute('aria-hidden', 'true');
					}
				} else {
					if(options.mode==="add") {
						element.setAttribute('aria-hidden', 'true');
						element.classList.add(options.class);
					}
					if(options.mode==="remove") {
						element.setAttribute('aria-hidden', 'false');
						element.classList.remove(options.class);
					}
				}
			});
			self.finished(pid,self.queue.DEFINE.FIN_OK);
		} else {
			self.finished(pid,self.queue.DEFINE.FIN_WARNING,'Could not remove class ['+options.class+'] to ['+options.targetId+']');
		}
	}


	/**
	 * Focus on a target
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target to scroll to*
	 * @example
	 * elements.focus({"targetId":"#ps_1"});
	 */
	focus(pid, json) {
		let objDiv = this.queue.getElement(json.targetId);
		objDiv.focus();
		this.finished(pid,this.queue.DEFINE.FIN_OK);
	}

	/**
	 * Scroll a dom container target to a dom target
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - Dom target to scroll to
	 * @param {string} json.containerId - Dom target container to scroll
	 *
	 * @example
	 * elements.scrollIntoView({"containerId":".map-elements-list","targetId":"#ps_1"});
	 */
	scrollContainerToElement(pid,json) {
		let self=this;
		let container = self.queue.getElement(json.containerId);
		let	element = self.queue.getElement(json.targetId);
		container.scrollTop = element.offsetTop;
		self.finished(pid,self.queue.DEFINE.FIN_OK);
	}

	/**
	 * Monitor element(s) in a form and add classes on change
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - elements(s) to monitor for change and add modifiedClass to
	 * @param {string} json.buttonId - Element to add modifiedClass to
	 * @param {string} json.modifiedClass - Class to add to modified elements
	 * @param {string} json.modifiedQueue - Prepared queue to run when element modified
	 *
	 * @example
	 * elements.formActivityMonitor({"targetId":".functionMonitor","buttonId":".form-save","modifiedClass":"modified"});

	 */
	formActivityMonitor(pid,json) {
		let self=this;
		let elements=this.queue.getElements(json.targetId);
		let button;
		if(json.buttonId)
			button=this.queue.getElement(json.buttonId);
		elements.forEach(function(element) {
			element.addEventListener("change", function () {
				if(json.modifiedQueue)
					self.queue.execute(json.modifiedQueue,{});
				if(json.modifiedClass) {
					this.classList.add(json.modifiedClass);
					if(button)
						button.classList.add(json.modifiedClass);
				}
			});

			element.addEventListener("keypress", function () {
				if(json.modifiedQueue)
					self.queue.execute(json.modifiedQueue,{});
				if(json.modifiedClass) {
					this.classList.add(json.modifiedClass);
					if(button)
						button.classList.add(json.modifiedClass);
				}
			});

		});
		this.finished(pid,this.queue.DEFINE.FIN_OK);
	}

	/**
	 * Monitor element(s) in a form and validate
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - elements(s) to monitor for change and add modifiedClass to
	 * @param {string} json.buttonId - Element to add modifiedClass to
	 * @param {string} json.focusClass - Class to add to focuses elements
	 * @param {string} json.validClass - Prepared queue to run when element modified
	 * @param {string} json.errorClass - Prepared queue to run when element modified
	 * @param {string} json.timeout - Length of time after user has finished typing to update
	 *
	 * @example
	 * elements.formValidityMonitor({"targetId":".functionMonitor","buttonId":".submit-form","validClass":"valid","focusClass":"focus","errorClass":"error"},{"queueRun":"Instant"});

	 */
	formValidityMonitor(pid,json) {
		let self=this;
		let elements=this.queue.getElements(json.targetId);
		let button;
		if(json.buttonId)
			button=this.queue.getElement(json.buttonId);
		let modules={};
		let timerEvent;
		let timerTimeout=json.timeout||2000;
		modules['email']=new ValidateEmail();
		modules['text']=new ValidateText();
		modules['password']=new ValidatePassword();
		elements.forEach(function(element) {
			/*
			 * Focus is new, clear down focused classes and reclass
			 */
			element.addEventListener("focus", function () {
				elements.forEach(function(element) {
					element.classList.remove(json.focusClass);
				});
				this.classList.add(json.focusClass);
			});

			/*
			 * There is a change to the field (normally they exit the field
			 */
			element.addEventListener("change", function () {
				if (timerEvent)
					clearTimeout(timerEvent);
				changeUpdate(element,this);
			});

			/*
			 * Key up so after the user has finishing typing
			 */
			element.addEventListener("keyup", function (e) {
				if(e.which!==9) {
					if (timerEvent)
						clearTimeout(timerEvent);
					let ptr = this;
					timerEvent = setTimeout(function () {
						changeUpdate(element, ptr);
					}, timerTimeout);
				}
			});

		});

		/*
		 * Function to actually update the fields
		 */
		function changeUpdate(element,ptr) {
			if(element.getAttribute('data-validation')) {
				let moduleName = element.getAttribute('data-validation').toLowerCase();
				if (modules[moduleName].valid(element.value, {})) {
					ptr.classList.remove(json.errorClass);
					ptr.classList.add(json.validClass);
				} else {
					ptr.classList.add(json.errorClass);
					ptr.classList.remove(json.validClass);
				}
				let needValidations=self.queue.getElements(json.targetId+'[data-validation]');
				let isValidated=self.queue.getElements(json.targetId+'[data-validation].'+json.validClass);
				if(needValidations.length===isValidated.length) {
					button.classList.add(json.validClass);
				} else {
					button.classList.remove(json.validClass);
				}
			}
		}

		this.finished(pid,this.queue.DEFINE.FIN_OK);
	}

	dragOn(pid, json) {
		let self=this;
		let options = Object.assign({
			"drag": "default",
		}, json);

		if(this.drags===undefined) {
			this.drags={};
		}

		let element = this.queue.getElement(json.targetId);

		this.drags[options.drag]={pos:{x:0,y:0,x1:0,y1:0},element:element};

		element.addEventListener('mousedown',dragMouseDown);


		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			self.drags[options.drag].pos.x1=e.clientX;
			self.drags[options.drag].pos.y1=e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			self.drags[options.drag].pos.x=self.drags[options.drag].pos.x1 - e.clientX;
			self.drags[options.drag].pos.y=self.drags[options.drag].pos.y1 - e.clientY;
			self.drags[options.drag].pos.x1=e.clientX;
			self.drags[options.drag].pos.y1=e.clientY;
			// set the element's new position:
			element.style.top = (element.offsetTop - self.drags[options.drag].pos.y) + "px";
			element.style.left = (element.offsetLeft - self.drags[options.drag].pos.x) + "px";
		}

		function closeDragElement() {
			/*
			 * End of drag so get rid of events
			 */
			document.onmouseup = null;
			document.onmousemove = null;
		}

		this.finished(pid,this.queue.DEFINE.FIN_OK);

	}
}
