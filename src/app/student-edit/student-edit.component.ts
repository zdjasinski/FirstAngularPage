import { Component, OnInit } from '@angular/core';
import {Student} from '../interfaces/student.interface';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../services/student.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    // Uzyskanie wartości parametru "id" i jego konwersja na liczbę
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    // Zapisuje dane i przekierowuje do poprzedniego widoku
    this.studentService.updateStudent(this.student)
      .subscribe(() => this.goBack());
  }

}