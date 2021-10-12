export interface UserIsAllowedToSeeCourseData {
  readonly courseId: string;
  readonly context?: any;
}

export interface UserIsAllowedToEditCourseData {
  readonly courseId: string;
  readonly context?: any;
}

export const userIsAllowedToSeeCourse = async (data: UserIsAllowedToSeeCourseData) => {
  return true;
};

export const userIsAllowedToEditCourse = async (data: UserIsAllowedToSeeCourseData) => {
  return true;
};
