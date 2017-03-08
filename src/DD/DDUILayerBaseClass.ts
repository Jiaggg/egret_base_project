module DD {
	export class DDUILayerBaseClass extends eui.Component {
		private _lastFrameTime:number;
		public constructor() {
			super();
			this._lastFrameTime = egret.getTimer();
			this.addEventListener(eui.UIEvent.COMPLETE,this.createOnComplete,this);
		}

		private createOnComplete():void{
			this.removeEventListener(eui.UIEvent.COMPLETE,this.createOnComplete,this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			this.onComplete();
		}

		public onComplete():void{
		}

		private onEnterFrame():void{
			let now = egret.getTimer();
			this.update(now - this._lastFrameTime);
			this._lastFrameTime = now;
		}

		public update(dt:number):void{

		}

		public destroy():void{
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}
	}
}