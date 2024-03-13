export class Course {
    _id: string;
    nameCourse: string;
    kodeKategory: string;
    amountLessons: number;
    startCourseDate: Date;
    videosArr: string[];
    wayLearning: WayLearning;
    kodeLecture: string;
    image: string;

    constructor(nameCourse: string, kodeKategory: string, amountLessons: number,
        startCourseDate: Date, videosArr: string[], wayLearning: WayLearning, kodeLecture: string, image: string) {
        this.nameCourse = nameCourse;
        this.kodeKategory = kodeKategory;
        this.amountLessons = amountLessons;
        this.startCourseDate = startCourseDate;
        this.videosArr = videosArr;
        this.wayLearning = wayLearning;
        this.kodeLecture = kodeLecture;
        this.image = image;
    }
}
export enum WayLearning {
    zoom = 1,
    frontaly = 2
}