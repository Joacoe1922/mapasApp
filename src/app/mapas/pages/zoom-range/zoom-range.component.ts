import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        right: 50px;
        max-width: 500px;
        padding: 10px;
        position: fixed;
        z-index: 999;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 14;
  center: [number, number] = [ -68.85833742835626, -32.87286702081155 ];

  constructor() {}

  ngOnDestroy(): void {
    this. mapa.off('zoom', () => {});
    this. mapa.off('zoomend', () => {});
    this. mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',       
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();      
    });
    
    // Zoom máximo (18)
    this.mapa.on('zoomend', (ev) => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      };
    });

    // Movimiento del mapa
    this.mapa.on('move', (event) => {      
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat ];
    })

  }
  
  zoomOut() {
    this.mapa.zoomOut();
  }
  
  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio( valor: string ) {
    this.mapa.zoomTo( Number( valor ) );
  }

}
