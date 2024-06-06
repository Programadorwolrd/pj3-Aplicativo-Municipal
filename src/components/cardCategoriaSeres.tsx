import { Button } from 'tamagui';

interface Props {
    title: string;
    link: string;
}
export default ({ title, link }: Props) => <Button backgroundColor={'white'} color={'green'} borderWidth={1} borderColor={"#000000"} >{title}</Button>;


