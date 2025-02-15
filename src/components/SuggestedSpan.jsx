// import React, { useEffect, useState } from 'react';

// const SuggestSpan  = ({Composition, langtool_suggestion}) => {

//     //pre-process the Suggested_object here

//     const [SuggestedModif, SetSuggestedModif] = useState([]);

//     const Suggested_dummy = 'suggested here.';

//     const CheckSentenceHighlight = () => {

//         let span_array = []

//         langtool_suggestion.map((fix_object) => {
            
//            if (fix_object.messages[0] == ''){
//             console.log(fix_object.sentence_modif);

//             span_array.push(<span>{fix_object.sentence_modif}</span>);
//            } else {
//             console.log(fix_object.sentence_modif);

//             span_array.push(<span className='text-green-500'>{fix_object.sentence_modif}</span>);
//            }

//         })

    
//         SetSuggestedModif(span_array);


//     }

//     useEffect(()=> {
//         CheckSentenceHighlight();
//     }, []);


//     return (
//         <>
//             <span>
//               {SuggestedModif}
//             </span>
//         </>
//     )
// }

// export default SuggestSpan;





import React, { useEffect, useState } from 'react';

const SuggestSpan = ({ Composition, langtool_suggestion }) => {
  // Pre-process the Suggested_object here
  const [SuggestedModif, SetSuggestedModif] = useState([]);

  const CheckSentenceHighlight = () => {
    let span_array = [];

    // Check if langtool_suggestion exists and is an array
    if (langtool_suggestion && Array.isArray(langtool_suggestion)) {
      langtool_suggestion.map((fix_object) => {
       if (fix_object.messages[0] == ''){
        console.log(fix_object.sentence_modif);
        // Insert the actual value of fix_object.sentence_modif, not the string
        span_array.push(
          <span key={fix_object.sentence_modif}>
            {fix_object.sentence_modif + ' '}
          </span>
        );
       } else {
        console.log(fix_object.sentence_modif);
        // Insert the actual value of fix_object.sentence_modif, not the string
        span_array.push(
          <span key={fix_object.sentence_modif} className='text-green-500'>
            {fix_object.sentence_modif + ' '}
          </span>
        );
       }
      });
    } else {
      // Handle case where langtool_suggestion is null, undefined, or not an array
      console.error('langtool_suggestion is null or not an array');
    }

    SetSuggestedModif(span_array);
  };

  useEffect(() => {
    CheckSentenceHighlight();
  }, [langtool_suggestion]);

  return <>{SuggestedModif}</>;
};

export default SuggestSpan;
