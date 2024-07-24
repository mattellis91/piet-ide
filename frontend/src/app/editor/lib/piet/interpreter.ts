import { Color } from "../../components/palete-panel/palete-panel.component";

interface Point {
    x: number;
    y: number;
}

export class Interpreter {
    
    static HueCount = 6;
    static LightnessCount = 3;
    static codelMap:Record<string, {color:string, abbv:string, hue:number, dark:number}> = {
        '#ffc0c0':{'color':'light red','abbv':'lR','hue':0,'dark':0},
        '#ffffc0':{'color':'light yellow','abbv':'lY','hue':1,'dark':0},
        '#c0ffc0':{'color':'light green','abbv':'lG','hue':2,'dark':0},
        '#c0ffff':{'color':'light cyan','abbv':'lC','hue':3,'dark':0},
        '#c0c0ff':{'color':'light blue','abbv':'lB','hue':4,'dark':0},
        '#ffc0ff':{'color':'light magenta','abbv':'lM','hue':5,'dark':0},
        '#ff0000':{'color':'red','abbv':' R','hue':0,'dark':1},
        '#ffff00':{'color':'yellow','abbv':' Y','hue':1,'dark':1},
        '#00ff00':{'color':'green','abbv':' G','hue':2,'dark':1},
        '#00ffff':{'color':'cyan','abbv':' C','hue':3,'dark':1},
        '#0000ff':{'color':'blue','abbv':' B','hue':4,'dark':1},
        '#ff00ff':{'color':'magenta','abbv':' M','hue':5,'dark':1},
        '#c00000':{'color':'dark red','abbv':'dR','hue':0,'dark':2},
        '#c0c000':{'color':'dark yellow','abbv':'dY','hue':1,'dark':2},
        '#00c000':{'color':'dark green','abbv':'dG','hue':2,'dark':2},
        '#00c0c0':{'color':'dark cyan','abbv':'dC','hue':3,'dark':2},
        '#0000c0':{'color':'dark blue','abbv':'dB','hue':4,'dark':2},
        '#c000c0':{'color':'dark magenta','abbv':'dM','hue':5,'dark':2},
        '#ffffff':{'color':'white','abbv':'Wt','hue':-1,'dark':-1},
        '#000000':{'color':'black','abbv':'Bk','hue':-1,'dark':-1}
    }

    dp: number = 0;
    cc: number = -1;
    stack: number[] = [];
    blockValue: number = 1;
    pixelData: string[][] = [];
    dpDirection: Point = {x: 1, y: 0};
    ccDirection: Point = {x: 0, y: 1};
    
    constructor(pixelData: string[][]) {
        this.pixelData = pixelData;
        console.log(this.pixelData)
    }

    run() {

    }

    noOp() {
        return;
    }

    push() {
        this.stack.push(this.blockValue);
    }

    pop() {
        if(this.stack.length > 0) {
            this.blockValue = this.stack.pop()!
        }
    }

    matrixToArray(matrix: string[][]) {
        return matrix.reduce((acc, val) => acc.concat(val), []);
    }

    static setPalletCommands(currentColor:string, commands: Color[]) {
        for(let command of commands) {
            command.action = this.getCommandFromColorChange(currentColor, command.hex.toLowerCase());
        }
    }
    
    static getCommandFromColorChange(prevColor:string, newColor:string): string {
        const oldLightness = (this.codelMap[prevColor]).dark;
        const oldHue = this.codelMap[prevColor].hue;

        const newLightness = this.codelMap[newColor].dark;
        const newHue = this.codelMap[newColor].hue;

        const lightnessChange = (newLightness - oldLightness + Interpreter.LightnessCount) % Interpreter.LightnessCount;
        const hueChange = (newHue - oldHue + Interpreter.HueCount) % Interpreter.HueCount;

        switch(lightnessChange) {
            case 0:
                switch(hueChange) {
                    case 1:
                        return 'add';
                    case 2:
                        return 'div';
                    case 3:
                        return 'gt';
                    case 4:
                        return 'dup';
                    case 5:
                        return 'in(c)';
                }
                break;
            case 1:
                switch(hueChange) {
                    case 0:
                        return 'push';
                    case 1:
                        return 'sub';
                    case 2:
                        return 'mod';
                    case 3:
                        return 'pointer';
                    case 4:
                        return 'roll';
                    case 5:
                        return 'out(n)';
                }
                break;
            case 2:
                switch(hueChange) {
                    case 0:
                        return 'pop';
                    case 1:
                        return 'multi';
                    case 2:
                        return 'not';
                    case 3:
                        return 'switch';
                    case 4:
                        return 'in(n)';
                    case 5:
                        return 'out(c)';
                }
                break;
        }

        return '';
    }

    
}