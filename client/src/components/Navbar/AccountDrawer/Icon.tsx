function Icon({
  text,
  click,
  image = null,
}: {
  text?: string;
  click: (e: any) => void;
  image?: string | null;
  id: string;
}) {
  return (
    <>
      {image && (
        <div className="h-[40px] w-[40px] cursor-pointer">
          <img
            id="icon1"
            onClick={(e) => {
              click(e);
            }}
            src={image}
            className="w-full h-full rounded-full"
            alt=""
          />
        </div>
      )}
      {text && !image && (
        <div
          id="icon2"
          onClick={(e) => {
            click(e);
          }}
          className="bg-primary cursor-pointer text-secondary"
          style={{
            borderRadius: "50%",
            display: "inline-block",
            width: "40px",
            height: "40px",
            textAlign: "center",
            lineHeight: "40px",
            fontWeight: "bold",
          }}
        >
          {text.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
}

export default Icon;
