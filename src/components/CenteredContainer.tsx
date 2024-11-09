function CenteredContainer({children}: {children: React.ReactNode}) {
    return (
        <div className={"flex flex-col gap-6 justify-center items-center mx-auto my-16 xxs:w-5/6 xl:w-3/5"}>
            {children}
        </div>
    );
}

export default CenteredContainer;