module DD {
	export class DDUILayerManager {
		private _root:eui.UILayer;
		private _curLayer:DD.DDUILayerBaseClass;
		private _curType:string;
		private _nextType:string;
		private _curLoading:boolean;
		private _curLoadingGroups:string[];
		private _curLoadedGroups:{};

		private _typeForGroups:{};
		public constructor() {
			this._typeForGroups = {};
		}

		public register_layer(type:string, groups:string[]){
			this._typeForGroups[type] = groups;
		}

		public init(root:eui.UILayer):void{
			this._root = root;
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		}

		protected createLayer(type:string):DD.DDUILayerBaseClass{
			return null;
		}

	public changeLayer(type:string):Boolean{
		if(this._curLoading)
			return false;
		this._curLoading = true;
		this._curLoadedGroups = {};
		this._curLoadingGroups = this._typeForGroups[type];
		this._nextType = type;

		let len = this._curLoadingGroups.length;
		if(len > 0){
			for(let i = 0; i < len; i++){
				RES.loadGroup(this._curLoadingGroups[i]);
			}
		}else{
			this.loadCmp();
		}
	}

	private loadCmp():void{
		if(this._curType){
			let grps:string[] = this._typeForGroups[this._curType];
			for(let i = 0; i < grps.length; i++){
				RES.destroyRes(grps[i]);
			}
			if(this._curLayer){
				if(this._curLayer.parent)
					this._curLayer.parent.removeChild(this._curLayer);
				this._curLayer.destroy();
			}
		}

		this._curType = this._nextType;
		this._curLayer = this.createLayer(this._nextType);
		this._curLoading = false;
		if(!this._curLayer){
			Error("....");
			return;
		}
		this._root.addChild(this._curLayer);
	}

	private onResourceLoadComplete(event:RES.ResourceEvent):void{
		if(this._curLoadingGroups.indexOf(event.groupName) == -1)
			return;
		this._curLoadedGroups[event.groupName] = event.groupName;
		let cmp = true;
		for(let i = 0; i < this._curLoadingGroups.length; i++){
			if(!this._curLoadedGroups[this._curLoadingGroups[i]]){
				cmp = false;
				break;
			}
		}
		if(cmp){
			this.loadCmp();
		}
	}

	private onResourceLoadError(event:RES.ResourceEvent):void{

	}

	private onResourceProgress(event:RES.ResourceEvent):void{

	}

	private onItemLoadError(event:RES.ResourceEvent):void{
		
	}
	}

}