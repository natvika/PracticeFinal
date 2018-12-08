import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Foo } from '../resources/data/foo-object';

@inject(Router, Foo)

export class Home {
  constructor(router, foos){
    this.router = router;
    this.foos = foos;
    this.showFooEditForm = false;
  }

  async activate(){
    await this.getFoos();
  }

  async getFoos(){
    await this.foos.getFoos();
  }

  attached() {
    feather.replace();
  }

  back() {
    this.showFooEditForm = false;
  }
  
  newFoo() {
    this.foo = {
      foo: "",
      woo: "boo"
    }
    this.openEditForm();
  }

  changeActive(foo) {
    this.foo = foo;
    this.save();
  }

  editFoo(foo) {
    this.foo = foo;
    this.openEditForm();
  }

  openEditForm() {
    this.showFooEditForm = true;
    setTimeout(() => { $("#foo").focus(); }, 500);
  }

  changeActive(foo) {
    this.foo = foo;
    this.save();
  }

  async save() {
    if (this.foo && this.foo.foo && this.foo.woo) {
      await this.foos.saveFoo(this.foo); 
      await this.getFoos();
      this.back();
    }
  }

  async delete() {
    if (this.foo) {
      await this.foos.delete(this.foo);
      await this.getFoos();
      this.back();
    }
  }

}
