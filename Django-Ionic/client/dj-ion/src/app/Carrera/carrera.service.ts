import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';



import { Observable } from 'rxjs/Observable';
import { of } from  'rxjs/observable/of';
import { catchError, map, tap } from  'rxjs/operators';


import { Carrera } from './carrera';




@Injectable()
export class CarreraAPIService {

   private baseUrl = 'http://127.0.0.1:8000/api/'


  constructor(private http: HttpClient){ }

  createHeaders(token?:string){
    let data = {
         "Content-Type": 'application/json',
    }
    if (token){
      data['Authorization'] = `JWT ${token}`
    }
     let httpOptions = {
          headers: new HttpHeaders(data)
      }
     return httpOptions
  }

  list(): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}carrera/?ordering=-timestamp` // http://127.0.0.1:8000/api/carrera/ 
      return this.http.get(apiListEndpoint)
  }

  createOrUpdate(content?:string, image?:File, id?:number, deleteImage?:boolean){
      let httpMethod = 'POST'
      let apiEndpoint = `${this.baseUrl}carrera/`
      if (id){
        apiEndpoint = `${this.baseUrl}carrera/${id}/`
        httpMethod = 'PUT'
      }
      // console.log(apiEndpoint, httpMethod)
      
      const formData: FormData = new FormData(); //?
      if (content){
        formData.append('content', content)
      }
       
      if (image){
        formData.append('image', image, image.name);
      } else if (deleteImage){
        formData.append('image', '') // delete on the server
      }
      const req = new HttpRequest(httpMethod, apiEndpoint, formData, {
        reportProgress: true // for progress data
      });
      return this.http.request(req)
  }

  createAndUpload(fileItem?:File, extraData?:object):any{
      let apiListEndpoint = `${this.baseUrl}carrera/`
      const formData: FormData = new FormData(); //?
       let nombre;
      if (extraData) {
        for(let key in extraData){
            // iterate and set other form data
            if (key == 'nombre'){
              nombre = extraData[key]
            }
          formData.append(key, extraData[key])
        }
      }

      if (fileItem){
        if (!nombre){
           nombre = fileItem.name
        }
        formData.append('image', fileItem, nombre);
      }

      const req = new HttpRequest('POST', apiListEndpoint, formData, {
        reportProgress: true // for progress data
      });
      return this.http.request(req)
  }


  create(content?:string, image?:any): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}carrera/` // http://127.0.0.1:8000/api/carrera/ 
      let data = {
          'content': content
      }
      return this.http.post(apiListEndpoint, data)
  }

  update(statusItem:Carrera): Observable<any>{
      let apiListEndpoint = `${this.baseUrl}carrera/${statusItem.id}/` // http://127.0.0.1:8000/api/carrera/ 
      return this.http.put(apiListEndpoint,carreraItem)
  }

  get(id?: number): Observable<Carrera>{
      if (!id){
          id = 10
      }
      let apiDetailEndpoint = `${this.baseUrl}carrera/${id}/`
      return this.http.get<Carrera>(apiDetailEndpoint)
  }
}
