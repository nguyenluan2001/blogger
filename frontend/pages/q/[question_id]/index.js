import MainLayout from "components/layouts/MainLayout";
import QuestionDetail from "components/question/QuestionDetail";
import { useQuestionBySlug } from "hooks/useQuestionBySlug";
import { useRouter } from "next/router";

const Question = () => {
    const router = useRouter();
    const {question_id: question_slug} = router.query;
    const {data: question, isLoading, refetch} = useQuestionBySlug(question_slug);
    console.log('question' ,question)
    return (
        <QuestionDetail question={question} refetch={refetch}></QuestionDetail>
    )
}   
Question.getLayout = function getLayout(page){
    return <MainLayout>{page}</MainLayout>
}
export default Question;