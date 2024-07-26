export namespace main {
	
	export class CurrentFile {
	
	
	    static createFrom(source: any = {}) {
	        return new CurrentFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}

}

