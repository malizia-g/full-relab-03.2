import { Component, OnInit } from '@angular/core';
import { GEOJSON, GeoFeatureCollection } from './models/geojson.model';
import {Marker} from './models/marker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang-maps';
  // google maps zoom level
  zoom: number = 8;
  geoJsonObject: GeoFeatureCollection; //Oggetto che conterrà il vettore di GeoJson
  fillColor: string = "#FF0000";  //Colore delle zone catastali
  markers: Marker[];  //Vettore con tutti i marker

  lng: number = 9.02657833507687;
  lat: number = 45.512051524024308;

  constructor() {
    //Questi dati dovremmo scaricarli dal server, per ora li abbiamo copiati nel file gojson.model.ts
    this.geoJsonObject = GEOJSON;
    console.log(this.geoJsonObject); //stampo l'oggetto geoJsonObject sulla console
    //Provo a visualizzare le coordinate della prima features
    console.log(this.geoJsonObject.features[0].geometry.coordinates);
  }

  ngOnInit() {
      //features[0] seleziona il primo geoJson
      //coordinates[0] ottiene la lista di poligoni.
      //coordinates[0][0] ottiene il primo (e unico) poligono della lista
      //coordinates[0][0][0] ottiene la longitudine
      //coordinates[0][0][1] ottiene la latitudine
    /*this.markers = [
      {
        lng: this.geoJsonObject.features[0].geometry.coordinates[0][0][0],
        lat: this.geoJsonObject.features[0].geometry.coordinates[0][0][1],
        label: String(this.geoJsonObject.features[0].properties.id),
      },
      {
        lng: this.geoJsonObject.features[1].geometry.coordinates[0][0][0],
        lat: this.geoJsonObject.features[1].geometry.coordinates[0][0][1],
        label: String(this.geoJsonObject.features[1].properties.id),
      }
    ]*/

    //Uso di un ciclo foreach per riempire i marker
    this.markers = [];

    for (let feature of  this.geoJsonObject.features) {
      let lng = feature.geometry.coordinates[0][0][0];
      let lat = feature.geometry.coordinates[0][0][1];
      let id = String(this.geoJsonObject.features[0].properties.id);
      let marker : Marker = new Marker(lat, lng, id);
      this.markers.push(marker);
    }

  }

  styleFunc = (feature) => {
    console.log(feature.i.id)
    let newColor = "#FF0000"; //RED
    if (feature.i.id == 0) newColor = "#00FF00"; //GREEN
    else newColor = "#0000FF"; //BLUE

    return ({
      clickable: false,
      fillColor: newColor,
      strokeWeight: 1
    });
  }

}


// future use 


/*constructor(public http: HttpClient)
  {
    //this.obsGeoJson = http.get<GeoJson>("https://my-json-server.typicode.com/malizia-g/fine_anno/relab_first_json");
    //this.obsGeoJson.subscribe(this.getGeoData);

  }

  getGeoData = (newData : GeoJson)=>
  {
    this.geoJsonObject = GEOJSON;
  }*/

