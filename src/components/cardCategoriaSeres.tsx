import { Button } from 'tamagui';

export interface PropsCard {
    title: string;
    link: string;
}
export default ({ title, link }: PropsCard) => <Button backgroundColor={'white'}  color={'green'} borderWidth={1}  marginHorizontal={'100px'} borderColor={"$red1Dark"}>{title}</Button>;


