/**
 * 责任链（链式行为）
 * 
 */
export class Action {
	#nextAction;
	constructor() {
		this.#nextAction = null;
	}
	
	setNextAction(action) {
		this.#nextAction = action;
		return this.#nextAction;
	}
	
	handle() {
		if (this.#nextAction != null) {
			this.#nextAction.handle();
		}
	}
}