import { axiosInstance, axiosRefresh } from "./axiosInstances";

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