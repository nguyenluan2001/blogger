import { Container } from "@mui/material";
import MainLayout from "components/layouts/MainLayout";
import QuestionEdit from "components/question/QuestionEdit";

const CreateQuestion = () => {
    return (
        <Container maxWidth="lg">
            <QuestionEdit></QuestionEdit>
        </Container>
    )
}
CreateQuestion.getLayout = function getLayout(page){
    return <MainLayout>{page}</MainLayout>
}
export default CreateQuestion;