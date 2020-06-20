import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { Carrera } from '../carrera/carrera';
import { CarreraAPIService } from '../carrera/carrera.service';

@Component({
  selector: 'carrera-action',
  templateUrl: './carrera-action.component.html',
  styleUrls: ['./carrera-action.component.css']
})
export class CarreraActionComponent implements OnInit {
    // Handles Create, Update and Delete of the Carrera Item

    // create related
    @Input() isCarreraListView = false // is the current component a list?    
    @Output() carreraItemCreated = new EventEmitter<Carrera>() // is a Event

    // update related
    @Input() carreraItemToUpdate: Carrera;
    carreraUpdateItemId: number; 
    @Output() carreraUpdated = new EventEmitter<Carrera>();

    viewEditForm = true;
    viewToggleBtn = false;

    responseStatusItem: Carrera;
    carreraForm: FormGroup;
    content: FormControl;
    errorMsg: string;
    carreraCreateSub: any;
    carreraDir: NgForm;
    imageToUpload: File  = null;
    uploadProgress:number = 0;
    uploadComplete:boolean = false;
    uploadingProgressing:boolean = false;
    serverResponse: any;
    newFileName: string;

    newImagePreviewUrl: string;
    currentImage: string;
    currentImageDidRemove = false;

    @ViewChild('myFileInput')
    myImageInput: any;

    @ViewChild('myTextArea')
    myContentText:any;


    statusAPISub:any;


    // carrera  = {content: ''}

  constructor(
    private router: Router,
    private statusAPI: CarreraAPIService
    ) { }

  ngOnInit() {
      
    this.setUpFormData()
      // console.log(this.myContentText.value)
  }
  ngOnDestroy(){
    if(this.statusAPISub){
      this.statusAPISub.unsubscribe()
    }
  }

  setUpFormData(){
      let content = ""
      
      if (this.statusItemToUpdate){
        let objUser = this.statusItemToUpdate.user
        this.viewEditForm = false;
        this.viewToggleBtn = true;
        this.statusUpdateItemId = this.statusItemToUpdate.id
        this.currentImage = this.statusItemToUpdate.image
        // let currentUsername = this.authAPI.getUsername()
        // if (objUser.username == currentUsername) {
        //   this.isUserOwner = true
        // }
        content = this.statusItemToUpdate.content
      }
      

      this.content  = new FormControl(content, [
                  Validators.minLength(4),
                  Validators.maxLength(280)
             ])
      this.statusForm = new FormGroup({
          'content': this.content
      })
  }

  toggleFormView(){
    this.viewEditForm = !this.viewEditForm
  }

  buttonPressed(event){
      this.toggleFormView()
  }

  resetFileInput() {
        this.newFileName = null;
        this.myImageInput.nativeElement.value = "";
   }

  resetProgress(){
    this.uploadProgress = 0;
    this.uploadComplete = false;
    this.uploadingProgressing = false;
  }

  resetMyTextArea(event?){
    if (event){
      event.preventDefault()
    }
    
    this.myContentText.nativeElement.value = ""
  }

  resetFormAll(){
    this.newImagePreviewUrl = undefined
    this.currentImageDidRemove = false
    this.resetFileInput()
    this.setUpFormData()
  }

  callFileInput(event){
    event.preventDefault()
    this.myImageInput.nativeElement.click()
  }

  toggleRemoveCurrentImage(event){
    event.preventDefault()
    this.currentImageDidRemove = !this.currentImageDidRemove
  }

  handleSuccessfulSave(statusItem){
    // item was saved!!
    this.newImagePreviewUrl = undefined;
    this.resetFileInput()
    this.resetMyTextArea()
    this.resetProgress()
     if (!this.isStatusListView){
       this.router.navigate(["/carrera", statusItem.id])
     } 
     this.statusItemCreated.emit(statusItem)
     this.statusUpdated.emit(statusItem)
  }

  

   handleProgress(event){
    if (event.type === HttpEventType.DownloadProgress) {
        this.uploadingProgressing =true
        this.uploadProgress = Math.round(100 * event.loaded / event.total)
      }

      if (event.type === HttpEventType.UploadProgress) {
        this.uploadingProgressing =true
        this.uploadProgress = Math.round(100 * event.loaded / event.total)
      }

      if (event.type === HttpEventType.Response) {
        // console.log(event.body);
        this.uploadComplete = true
        this.serverResponse = event.body
        this.responseStatusItem = event.body as Status
        // success! growl 
        this.handleSuccessfulSave(this.responseStatusItem)
        

      }
    }


  
  handleSubmit(event:any, statusDir:NgForm, statusForm:FormGroup){
      event.preventDefault()
      this.statusDir = statusDir
      if (statusDir.submitted){
        let submittedData = statusForm.value
        let content = submittedData.content
        let imageFile;
        let deleteImage;

        if (this.imageToUpload){
          imageFile = this.imageToUpload
        } else if (this.currentImageDidRemove 
                  && this.currentImage){
           imageFile = null
           deleteImage = true
        }
        this.statusAPISub = this.statusAPI.createOrUpdate(
                        content, imageFile, this.statusUpdateItemId, deleteImage
                 ).subscribe(
              event=>{
                this.handleProgress(event)
               }, 
              error=>{
                  this.handleError(error)
              });
      }
  }
   handleImageInput(files: FileList) {
        let imageItem = files.item(0);
        if (imageItem){
          this.newFileName = imageItem.name
          this.imageToUpload = imageItem

          let reader = new FileReader()
          reader.readAsDataURL(imageItem)
          reader.onload = (e:any) => {
            this.newImagePreviewUrl = e.target.result
          }

        }
    }


    handleError(errorResponse:any){
      let statusCode = errorResponse.carrera
        switch (statusCode) {
          case 401: // http carrera codes
            this.errorMsg = "Authentication Error. (401 Error)"
            this.errorMsg = errorResponse['error']['detail']
            break;
          case 403:
            this.errorMsg = "Authentication Error. (403 Error)"
            break;
          default:
            this.errorMsg = `There was an error. Please try again later. (${statusCode} Error)`
            break;
        }
    }

}
