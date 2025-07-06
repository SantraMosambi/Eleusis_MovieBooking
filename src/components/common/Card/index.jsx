import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomCard = ({
  poster,
  movie_name,
  show_time,
  date,
  pricePerSeat,
  seats_available,
  day,
  onClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      variant="outlined"
      sx={{
        width: isMobile ? 250 : 320,
        border: "2px solid #b11226",
        borderRadius: "12px",
        backgroundColor: "#1a1a1a",
        color: "#ffffff",
        boxShadow: "0 0 16px rgba(177,18,38,0.5)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 0 24px rgba(177,18,38,0.8)",
        },
      }}
    >
      {/* Poster */}
      <CardOverflow>
        <AspectRatio ratio="2/3">
          <img
            src={poster}
            alt={movie_name}
            loading="eager"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
          />
        </AspectRatio>
      </CardOverflow>

      {/* Movie Info + Book Button */}
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          pt: 2,
          flexDirection: "row",
        }}
      >
        <div>
          <Typography
            level="title-md"
            sx={{ color: "#ffffff", fontWeight: "bold", fontSize: "1.1rem" }}
          >
            {movie_name}
          </Typography>
          <Typography level="body-sm" sx={{ color: "#ccc" }}>
            ₹{pricePerSeat} | {seats_available} seats left
          </Typography>
        </div>

        <Button
          onClick={onClick}
          size="sm"
          variant="solid"
          sx={{
            backgroundColor: "#b11226",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#910d1f",
            },
          }}
        >
          Book Now
        </Button>
      </CardContent>

      {/* Show Details */}
      <CardOverflow variant="soft" sx={{ bgcolor: "#111" }}>
        <Divider sx={{ borderColor: "#b11226" }} inset="context" />
        <CardContent
          orientation="horizontal"
          sx={{ justifyContent: "space-between", gap: 1, pb: 1 }}
        >
          <Typography level="body-xs" sx={{ color: "#fff", fontWeight: "500" }}>
            {date}
          </Typography>
          <Typography level="body-xs" sx={{ color: "#fff", fontWeight: "500" }}>
            {show_time}
          </Typography>
          <Typography level="body-xs" sx={{ color: "#fff", fontWeight: "500" }}>
            {day}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default CustomCard;
