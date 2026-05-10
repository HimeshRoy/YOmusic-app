const SkeletonCard = () => {

  return (

    <div
      className="
        bg-[#181818]

        p-2
        sm:p-4

        rounded-xl

        animate-pulse
      "
    >

      {/* IMAGE */}
      <div
        className="
          w-full
          aspect-square

          rounded-lg

          bg-zinc-800
        "
      />

      {/* TEXT */}
      <div className="mt-3">

        <div
          className="
            h-3
            sm:h-4

            w-[80%]

            rounded-full

            bg-zinc-800

            mb-2
          "
        />

        <div
          className="
            h-2
            sm:h-3

            w-[50%]

            rounded-full

            bg-zinc-800
          "
        />

      </div>

    </div>

  );

};

export default SkeletonCard;