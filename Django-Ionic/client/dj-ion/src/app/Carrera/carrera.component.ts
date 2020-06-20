import { Component, OnInit, OnDestroy} from '@angular/core';

import { Carrera } from './carrera';

import { CarreraAPIService } from './carrera.service';


@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit, OnDestroy{
    results:Carrera[] = []
    statusListSub:any;
    refreshCount = 0
  constructor(private statusAPI: CarreraAPIService) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.carreraListSub = this.carreraAPI.list().subscribe(data=>{
      //console.log(data)
      this.results = data.results // as [Carrera]
    })
  }

  ngOnDestroy(){
    if (this.carreraListSub){
      this.carreraListSub.unsubscribe()
    }
  }

  replaceWith(array, ogItem, newItem){
    let ogItemIndex = array.indexOf(ogItem)
    const numberOfItemsToRemove = 1
    array.splice(ogItemIndex, numberOfItemsToRemove, newItem)
    return array
  }

  statusDidCreate(event){
    let newStatusItem = event as Carrera
    this.results.unshift(newStatusItem) // prepend
    // this.results.push(newStatusItem) // apppend
    // this.replaceWith(this.results, statusItem, newStatusItem)
  }

  statusDidUpdate(event, statusItem){
    let newStatusItem = event as Carrera
    this.replaceWith(this.results, statusItem, newStatusItem)
  }

}
