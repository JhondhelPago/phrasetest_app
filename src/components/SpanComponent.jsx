import React, { useState } from "react"
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

    const [Sents_list, SetSent_lists] = useState(Sents)
    let errors_list = errors_array
    let current_index = 0


    // arrow function here to check return a super for each sentence in Sent_list
    // if error found on the sent i will be process then modify the span to have an inner span, the inner span is RedSpan or GreenSpan


    useEffect(() => {
        console.log(Sents_list)
        console.log(errors_list)
        console.log(Array.isArray(errors_list))
    }, [])

    return (
      <div>
        <p>
            {Sents_list}
          
        </p>
      </div>
    )

}






export default NormalSpan;