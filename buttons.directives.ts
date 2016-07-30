import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[isActive]'
})

export class isActiveDirective{
  private defaultClass: string = "defaultActive";
  private childrens: Array<string>;
  private childrensClass: string;
  private method: string = "toggle"; // toggle or // ad
  private _isFocus: string; // focus element must be an ID
  private _isKeyActive: string; // key shortcus on active
  private _isKeyDesactive: string; // _ _ _  on desactive
  private isText: string; // text clean must be an ID
  private _isExeptions: Array<string>; //children or class that shouldn't execute code
  private el: HTMLElement;
  constructor(el: ElementRef) { this.el = el.nativeElement; }

  @Input() set haveChildrens(childrens: Array<string>){
    this.childrens = childrens;
  }

  @Input() set haveChildrensClass(childrensClass: string){
    this.childrensClass = childrensClass;
  }

  @Input() set selectMethod(method: string){
    this.method = method;
  }

  @Input() set cleanInput(isText: string){
    this.isText = isText;
  }

  @Input() set isFocus(isFocus: string){
    this._isFocus = isFocus;
  }

  @Input() set isKeyActive(isKeyActive: string){
    this._isKeyActive = isKeyActive;
  }

  @Input() set isKeyDesactive(isKeyDesactive: string){
    this._isKeyDesactive = isKeyDesactive;
  }

  @Input() set isExeption(isExeption: Array<string>){
    this._isExeptions = isExeption;
  }

  @Input('isActive') class: string;

  @HostListener('click', ['$event']) onClick(e) {
    if(this.method === "toggle"){
      console.log(this.checkExeptions(e));
      if(!this.checkExeptions(e)){
        this.toggleChildrens();
        this.el.classList.toggle(this.class || this.defaultClass);
      }
    }else{
      this.addChildrens();
      this.el.classList.add(this.class || this.defaultClass);
    }
    this.focus();
    e.stopPropagation();
  }

  @HostListener('document:click', ['$event']) onDocumentClick(e) {
    if(this.el.classList.contains(this.class || this.defaultClass)){
      this.removeChildrens();
      this.clean();
      this.el.classList.remove(this.class || this.defaultClass);
    }
  }

  @HostListener('document:keypress', ['$event']) onKeyPress(e) {
    //console.log(e.keyCode);
    if(typeof this._isKeyActive != 'undefined'){
    this.keyActive(e);
    }
    if(typeof this._isKeyDesactive != 'undefined'){
    this.keyDesactive(e);
    }

    return false;
  }

  private keyActive(e){
    if(e.keyCode == this._isKeyActive){
      if(!this.el.classList.contains(this.class || this.defaultClass)){
        this.clean();
        this.addChildrens();
        this.focus();
        this.el.classList.add(this.class || this.defaultClass);
      }
    }
  }

  private keyDesactive(e){
    if(e.keyCode == this._isKeyDesactive){
      this.clean();
      this.removeChildrens();
      this.el.classList.remove(this.class || this.defaultClass);
    }
  }

  private removeChildrens(){
    if(typeof this.childrens[0] != 'undefined'){
      for(let i = 0; i < this.el.children.length; i++){
        for(let children of this.childrens){
            if(this.el.children[i].classList.contains(children)){
              this.el.children[i].classList.remove(this.childrensClass || this.class || this.defaultClass);
            }
        }
      }
    }
  }

  private toggleChildrens(){
    if(typeof this.childrens[0] != 'undefined'){
      for(let i = 0; i < this.el.children.length; i++){
        for(let children of this.childrens){
            if(this.el.children[i].classList.contains(children)){
              this.el.children[i].classList.toggle(this.childrensClass || this.class || this.defaultClass);
            }
        }
      }
    }
  }

  private addChildrens(){
    if(typeof this.childrens[0] != 'undefined'){
      for(let i = 0; i < this.el.children.length; i++){
        for(let children of this.childrens){
            if(this.el.children[i].classList.contains(children)){
              this.el.children[i].classList.add(this.childrensClass || this.class || this.defaultClass);
            }
        }
      }
    }
  }

  private focus(){
    if(typeof this._isFocus != 'undefined'){
      document.getElementById(this._isFocus).focus();
    }
  }
  private clean(){
    if(typeof this.isText != 'undefined'){
      (<HTMLInputElement>document.getElementById(this.isText)).value = "";
    }
  }
  private checkExeptions(e){
    if(typeof this._isExeptions[0] != 'undefined'){
      for(let i = 0; i < this.el.children.length; i++){
        for(let exeption of this._isExeptions){
          if(e.target.classList.contains(exeption)){
            return true;
          }
        }
      }
    }
      return false;
  }
}
