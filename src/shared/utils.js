import { terms } from './constants';

export const buttonColor = selected => (
    selected ? 'success' : null
);

export const getCourseTerm = course => (
    terms[course.id.charAt(0)]
);

export const getCourseNumber = course => (
    course.id.slice(1, 4)
)