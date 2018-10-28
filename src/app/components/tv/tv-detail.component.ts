import {FlatTreeControl} from '@angular/cdk/tree';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Season, Episode, TvShow } from 'src/app/models/tv';
import { FileDatabase, FileFlatNode, FileNode } from 'src/app/models/file-node';
import { TvService } from 'src/app/services/tv.service';



@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.css'],
  providers: [FileDatabase]
})
export class TvDetailComponent implements OnInit {
  
  tvshow: TvShow;

  constructor(private route: ActivatedRoute, private tvService: TvService) {}

  ngOnInit() {
    this.tvshow = this.route.snapshot.data['tvshow'];
    var id = this.route.snapshot.params.id;
  }
}
