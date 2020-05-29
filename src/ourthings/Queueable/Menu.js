/** @module ourthings/Queueable/Menu */
import Queueable from "../Queueable";

/**
 * @classdesc
 *
 * Menu
 *
 * @author Richard Reynolds richard@nautoguide.com
 *
 * @example
 * menu.init({"targetId":"menu1"});
 *
 */
class Menu extends Queueable {

	/**
	 * Render a template into the dom using the queues templateProcessor
	 * @param {number} pid - Process ID
	 * @param {object} json - queue arguments
	 * @param {string} json.targetId - dom id of menu
	 * @example
	 * menu.init({"targetId":"menu1"});
	 */
	initMenu(pid,json) {
		let self=this;
		let options = Object.assign({
			"classModifiers":[
				{"targetId":".main-menu","class":"open-this-menu"},
				{"targetId":".page-header","clas":"open-search"}
			],
			"menuTop":"#menuTop"
		}, json);
		const element=this.queue.getElement(options.targetId);

		element.addEventListener("click", function (e) {
			const menuTop=self.queue.getElement(options.menuTop);
			if(menuTop.getAttribute('aria-expanded')==='true') {
				// Close
				for (let i in options.classModifiers) {
					const modElement = self.queue.getElement(options.classModifiers[i].targetId);
					modElement.classList.remove(options.classModifiers[i].class);
				}
				menuTop.setAttribute('aria-expanded','false')
			} else {
				// Open
				for (let i in options.classModifiers) {
					const modElement = self.queue.getElement(options.classModifiers[i].targetId);
					modElement.classList.add(options.classModifiers[i].class);
				}
				menuTop.setAttribute('aria-expanded','true')
			}
		});

		self.finished(pid,self.queue.DEFINE.FIN_OK);
	}
}

export default Menu;