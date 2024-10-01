import React from "react"
import { useEffect } from "react"
const RedSpan = ({string, key}) => {


    return (
        <span key={key} className="text-red-600 underline">{string}</span>
    )
}

const GreenSpan = ({string, key}) => {

    return (
        <span key={key} className="text-green-600 underline">{string}</span>
    )

}


const NormalSpan = ({Sents, errors_array, original}) => {

    let Sents_list = Sents
    let errors_list = errors_array


    useEffect(() => {
        console.log(errors_list)
        console.log(Array.isArray(errors_list))
    }, [])

    return (
        <span> 
            this is a span
            {/* {Sents_list.map((sent, index) => {

                if (original) {

                    if (index == errors_list[0].sent_index){

                        sent.split(' ').map((word) => {

                            if (word == errors_list[0].original_text){

                                errors_list.shift()

                                (
                                    (<RedSpan string={word} key={index}></RedSpan>)
                                )

                            }

                        })
                    } else {
                        return (
                            <span key={index} >{Sents}</span>
                        )
                    }

                    // (<RedSpan string={sent} key={index}></RedSpan>)

                }
                //  else {

                    

                //     (<GreenSpan string={sent} key={index}></GreenSpan>)

                // }

            })} */}
        </span>
    )

}






export default NormalSpan;