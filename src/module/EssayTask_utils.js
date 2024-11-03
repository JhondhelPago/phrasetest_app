


export class AbstractEssayAssignment{

    constructor(assignment_id, context_list){
        this.assignment_id = assignment_id;
        this.context_list = context_list;
    }

    display_assignment_id() {
        console.log(this.assignment_id);
    }

    display_context_answer_list() {
        console.log(this.context_list);
    }

}




let Assignment = new AbstractEssayAssignment(4, ['question1', 'question2']);


Assignment.display_assignment_id()
Assignment.display_context_answer_list();

console.log(Assignment.context_list[0]);

