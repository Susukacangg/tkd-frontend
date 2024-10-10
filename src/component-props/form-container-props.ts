export default interface FormContainerProps {
    headerString: string;
    subHeaderString?: string;
    children: React.ReactNode[] | React.ReactNode;
    formFooter?: React.ReactNode;
}