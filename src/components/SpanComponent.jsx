import React, { useState } from "react"
import { useEffect } from "react"
const RedSpan = ({string}) => {

    return (
       <span>
            <span className="text-red-600 underline">{string}</span> {" "}
       </span> 
    )
}

const GreenSpan = ({string, key}) => {

    return (
        <span key={key} className="text-green-600 underline">{string}</span>
    )

}


const PlainSpan = ({string_list, word_error}) => {

    const [WordList, SetWordList] = useState(string_list);

    const examineEachWord = () => {

        let WordList_Copy = [...WordList];

        let WordFoundIndex = WordList.findIndex(wordItem => wordItem == word_error);

        if (WordFoundIndex !== -1){
            WordList_Copy[WordFoundIndex] = <RedSpan string={word_error}></RedSpan>


        }

    }

    useEffect(() => {

        examineEachWord()

    }, [])

    return (
        <span>{WordList}</span>
    )
}


const NormalSpan = ({Sents, errors_array, original}) => {

    const [Sents_list, SetSent_lists] = useState(Sents);
    let errors_list = errors_array;
    let current_index = 0;


    // arrow function here to check return a super for each sentence in Sent_list
    // if error found on the sent i will be process then modify the span to have an inner span, the inner span is RedSpan or GreenSpan
    
    const processSents_list = () => {
        
        let Sents_list_Copy = [...Sents_list];
        
        let errors_list_copy = [...errors_list];
        


        for (let i = 0; i < Sents_list_Copy.length; i++) {

            let WordList = Sents_list_Copy[i].split(' ');
            let lastElement = WordList.at(-1);
            WordList[WordList.length - 1] = lastElement + ' ';

            //access there the target word and then make it a RedSpan
            //find the index of the word
            //if found access the index and then alter it with the span, pass the access word to the RedSpan props


            let wordIndex = WordList.findIndex(wordItem => wordItem == errors_list_copy[0].original_text)

            if (wordIndex !== -1){
                WordList[wordIndex] = errors_list_copy[0]
                errors_list_copy.shift()
                
            }


            Sents_list_Copy[i] = WordList;
        }

        SetSent_lists(Sents_list_Copy); // why this statement did not change
        console.log(Sents_list_Copy)
    }

    useEffect(() => {
        console.log(Sents_list);
        console.log(errors_list);
        console.log(Array.isArray(errors_list));
        processSents_list();
      
    }, [])

    return (
      <div>
        
            {/* {Sents_list.map((word_list) => {

                word_list.map((word) => {
                    
                    if (typeof word === 'string'){
                        
                        return (<span></span>)

                    } else {

                        return (<RedSpan string={word.original_text}></RedSpan>)

                    }

                })

            })}
           */}

            {Sents_list.map((word_list, index) => {
                if (Array.isArray(word_list)) {
                    return word_list.map((word, indx) => {
                        if (typeof word === 'string') {
                            return (<span key={`${index}-${indx}`}>{word + ' '}</span>);
                        } else {
                            return (<RedSpan key={`${index}-${indx}`} string={word.original_text}></RedSpan>);
                        }
                    });
                } else {
                    // Handle the case where word_list is not an array
                    console.error('word_list is not an array:', word_list);
                    return null; // You can choose to render an empty element or a fallback message
                }
            })}


           
        
      </div>
    )

}






export default NormalSpan;