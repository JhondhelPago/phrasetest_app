import { axiosInstance, axiosRefresh } from "./axiosInstances";
import { useNavigate } from "react-router-dom";
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

}


export class StudentAPICalls { 

    static loadStudentInfo = async () => {


        return 

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