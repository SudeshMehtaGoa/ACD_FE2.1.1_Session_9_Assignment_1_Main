/* Add Student Component */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

/* interfaces */
import { IStudentList, IStudentModel } from 'app/interface/student-list';
import { ISubjectType } from 'app/interface/student-subject';

/* services */
import { StudentService } from 'app/service/Student.service';
import { SubjectService } from 'app/service/Subject.service';
import { LogService } from 'app/service/log.service';

@Component({
  selector: 'student-root',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService, SubjectService, LogService]
})

export class StudentComponent implements OnInit {

  title: string = 'Add Student';

  SubjectTypeArray: ISubjectType[] = [];

  StudentsArray: IStudentList[] = [];
  StudentDetail: IStudentList;

  StudentModel: IStudentModel;

  constructor(private _StudentService: StudentService,
    private _SubjectService: SubjectService,
    private _logService: LogService) {
  }

  /**Define default values on ngOnInit function */
  ngOnInit() {
    this.StudentModel = {
      studentName: null,
      studentAddress: null,
      studentSubject: null,
      studentMarks: null
    };

    this.SubjectTypeArray = this._SubjectService.getSubjectType();
  };
  /* addStudent method linked to form ngSubmit */
  addStudent(values) {
    this.StudentDetail = {
      studentName: values.studentName,
      studentAddress: values.studentAddress,
      studentSubject: values.studentSubject,
      studentMarks: values.studentMarks
    };
    this._StudentService.addStudent(this.StudentDetail);
    this.StudentsArray = this._StudentService.getStudentList();
    this._logService.log();
    
  };
  /* Form reset */
  resetForm(f) {
    f.reset();
  };
}

