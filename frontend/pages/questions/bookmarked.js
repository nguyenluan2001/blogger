import { Box } from '@mui/material';
import QuestionLayout from 'components/layouts/QuestionLayout';
import QuestionList from 'components/question/QuestionList';
import { userCurrentUser } from 'hooks/useCurrentUser';
import {useQuestions} from 'hooks/useQuestions';

const BookmarkQuestion = () => {
    const {data: user} = userCurrentUser();
    const {data: questions} = useQuestions({
        query: {
            'bookmark_users': user?.id
        }
    })
    console.log('questions', questions)
    return (
        <Box>
        {questions && (
            <QuestionList questions={questions}></QuestionList> 
        )}
    </Box>
    )
}
BookmarkQuestion.getLayout = function getLayout(page) {
    return (
        // <MainLayout hasBanner={true}>{page}</MainLayout>
        <QuestionLayout>{page}</QuestionLayout>
    )
}
export default BookmarkQuestion;
