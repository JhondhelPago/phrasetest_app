import axios from "axios";
import { axiosInstance, axiosRefresh } from "./axiosInstances";
import { useNavigate } from "react-router-dom";
import { student } from "../assets";
//Teacher calls 

export const loadTeacherInfo = async() => {


    const response = await axiosInstance.get(`teacher/info`, {
        params: {
            access: localStorage.getItem('access'),
        },
    });

    return response;

}


export class TeacherApiCalls {

    static loadTeacherInfo = async () => {

        const response = await axiosInstance.get(`teacher/info`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            },
            params: {
                access: localStorage.getItem('access'),
            },
        });
    
        return response;

    }

    static associatedSections = async () => {

        const response = await axiosInstance.get('teacher/section', {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            params: {
                access: localStorage.getItem('access'),
            }
        });

        return response;

    }

    static associatedAssignmentsOnCurrentSection = async (section_code) => {
        const response = await axiosInstance.get(`teacher/section/info`, {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            params: {
                section_code: section_code
            }
        });

        return response;
    }

    static CurrentAssignmetStateDetails = async (assignment_id) => {

        const response = await axiosInstance.get(`teacher/assignment/info/details`, {
            
            headers : {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            params : {
                assignment_id : assignment_id
            }
        });

        return response;

    }

    static CreateEssayAssignment = async (section_code, context, question_list, date, time) => {

        const  data = {
            access : localStorage.getItem('access'),
            section_code : section_code,
            question_list : question_list,
            date : date,
            time : time
        }

        const response = await axiosInstance.post(`teacher/create/essay/assignment`, data, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            }
        });

        return response;
    }

    static AddNewSection = async (section_name) => {

        const data = {
            'access' : localStorage.getItem('access'),
            section_name : section_name
        }

        const response = await axiosInstance.post(`teacher/section/new/`, data, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            }
        });

        return response;
    }

    static ViewStudentExamineResult = async (student_id, assignment_id) => {

        const response = await axiosInstance.get(`teacher/view/examineresults`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            },
            params : {
                student_id : student_id,
                assignment_id : assignment_id
            }
        });

        return response;
    }

    static AddComment = async (student_id, assignment_id, comment) => {
        const data = {
            "student_id" : student_id,
            "assignment_id" : assignment_id,
            "comment" : comment
        }

        const response = await axiosInstance.post(`teacher/add/comment/`, data, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            }
        });

        return response;
    }

}


export class StudentAPICalls { 

    static loadStudentInfo = async () => {

        const response = await axiosInstance.get('/student/info', {
            headers : {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            params : {
                access : localStorage.getItem('access')
            }
        });

        return response;

    }

    static Assignment_list = async () => {

        const response = await axiosInstance.get('/student/assignments', {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            },
            params : {
                access : localStorage.getItem('access')
            }
        });

        return response;
    }

    static SubmitEssay = async (composition, assignment_id) => {

        const data = {
            access : localStorage.getItem('access'),
            composition : [composition], 
            assignment_id, assignment_id
        }

        const response = await axiosInstance.post(`/student/submit/assignment/`, data, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            }
        });
        
        return response;
    }

    static CheckEssaySubmit = async (assignment_id) => {

        const response = await axiosInstance.get(`student/check/assignment/submit`, {
            headers :{
                Authorization : `Bearer ${localStorage.getItem('access')}`
            }, 
            params : {
                access : localStorage.getItem('access'),
                assignment_id : assignment_id
            }
        });

        return response;
    }

    static GetExamineResults = async (assignment_id) => {

        const response = await axiosInstance.get(`student/assignment/results`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            },
            params : {
                access : localStorage.getItem('access'),
                assignment_id : assignment_id,
            }
        });

        return response;
    }

    static JoinClass = async (section_code) => {

        const data = {
            'access' : localStorage.getItem('access'),
            'section_code' : section_code
        }

        const response = await axiosInstance.post(`student/join/class/`, data, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            }
        })

        return response;
    }

    static FinishedTask = async () => {

        const response = await axiosInstance.get(`student/assignment/finished`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('access')}`
            }, 
            params : {
                access : localStorage.getItem('access')
            }
        });

        return response;
    }

}



export const ReqAccessToken = async () => {


    const response = await axiosInstance.post('user/auth/token/new/access', {

        refresh : localStorage.getItem('refresh')

    });


    return response;

}


export const ReqAccessTokenSuperScope = async () => {

    let status_code;
    let response_holder;

    try{

        const response = await ReqAccessToken();
        status_code = response.status;

        response_holder = response;

    } catch (error) {

        status_code = error.response.status;

        response_holder = error.response;

    } finally {

        return {
            'status_code' : status_code,
            'result' : response_holder
        }
    }

}

export const DirectToLogin = () => {

    const navigate = useNavigate()

    navigate('/loginpage');

}