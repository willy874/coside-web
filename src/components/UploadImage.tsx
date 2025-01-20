"use client";

import {
  ChangeEventHandler,
  DragEvent,
  DragEventHandler,
  useRef,
  useState,
  useEffect
} from "react";
import Image from "next/image";
import { alpha, styled } from "@mui/material/styles";
import { Box, Typography, Button, Grid } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import useLoginStore from "@/stores/loginStore";
import theme from "@/styles/theme";

const StyledUploadWrapper = styled('div')(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: 12,
  overflow: "hidden",
  input: {
    display: "none",
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  width: '100%',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: 12,
}));

const StyledImage = styled(Image)(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center center",
  transition: "transform 0.3s",
  transform: "scale(1)",
  "&:hover": {
    transform: "scale(1.2)",
  },
}));

const cosideDefaultImages = [
  "/default_img.png",
  "/default_img.png",
  "/default_img.png",
  "/default_img.png",
  "/default_img.png",
  "/default_img.png"
];

const TabButton = ({ onClick, isActive, iconSrc, label }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: theme.palette.grey[400],
        display: "flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: 0,
        position: "relative",
        padding: "10px 20px",
        "&:hover": {
          color: theme.palette.secondary.main,
          bgcolor: "transparent",
        },
        "&:hover::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "2px",
          backgroundColor: theme.palette.secondary.main,
        },
        ...(isActive && {
          color: theme.palette.secondary.dark,
          bgcolor: "transparent",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "2px",
            backgroundColor: theme.palette.secondary.dark,
          },
        }),
      }}
    >
      <Image
        src={iconSrc}
        alt={label}
        width={20}
        height={20}
        color={`${theme.palette.grey[200]}`}
        style={{ marginRight: "1.5px" }}
      />
      <Typography
        sx={{
          lineHeight: "19px",
          textTransform: "none",
        }}>{label}</Typography>
    </Button>
  );
};

const ImageGrid = ({
  images,
  getImageSrc,
  getImageKey,
  onImageClick,
  imageWidth = 135,
  imageHeight = 80,
  activeIndex,
  setActiveIndex
}) => {
  const handleImageClick = (index: number, src: string) => {
    setActiveIndex(index);
    onImageClick(src);
  };

  return (
    <Grid container spacing={1.5} sx={{ marginTop: "-11px" }}>
      {images.map((item, index) => {
        const src = getImageSrc(item);
        const isActive = activeIndex === index;

        return (
          <Grid
            item
            xs={6}
            sm={3}
            key={getImageKey ? getImageKey(item) : `${item}_${index}`}
          >
            <Box
              onClick={() => handleImageClick(index, src)}
              sx={{
                overflow: "hidden",
                cursor: "pointer",
                width: imageWidth,
                height: imageHeight,
                borderRadius: "12px",
                border: `1px solid ${theme.palette.grey[200]}`,
                outline: `1px solid transparent`,
                transition: "all 0.3s",
                "&:hover": {
                  border: `1px solid ${theme.palette.secondary.main}`,
                  outline: `1px solid ${theme.palette.secondary.main}`,
                },
                ...(isActive && {
                  border: `1px solid ${theme.palette.secondary.dark}`,
                  outline: `1px solid ${theme.palette.secondary.dark}`,
                }),
              }}
            >
              <StyledImage
                src={src}
                alt={`image ${index + 1}`}
                width={imageWidth}
                height={imageHeight}
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default function UploadImage(props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const { setToken, token, isAuthenticated } = useLoginStore();

  const stopDefault = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFile = async (_file: File | null = null) => {
    setError('');
    setFile(_file);
    if (!_file) {
      props.setPreviewImage('');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function () {
      if (typeof this.result === 'string') props.setPreviewImage(this.result);
    };

    const data = new FormData();
    data.append("file", _file);
    try {
      const res =
        await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/upload?type=images`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      props.onData(res.data.data);
      console.log(res.data.data)
    } catch (e) {
      console.error('upload error', e);
    }

    fileReader.readAsDataURL(_file);
  };

  const deleteImage = () => {
    props.onData('');
    props.setPreviewImage('');
    props.setActiveIndex(null);
  }

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    stopDefault(e);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleFile(e.target.files?.[0]);
  }

  const handleSearchChange = (e) => {
    props.setSearchValue(e.target.value);
  };

  const onSearch = (e) => {
    if (e.target.value.trim() === '') console.log('請輸入搜尋內容');
    else {
      props.setFilterValue(e.target.value);
    };
  }

  const chooseImageType = (type: string) => {
    props.onData('');
    props.setPreviewImage('');
    props.setImageType(type);
    props.setActiveIndex(null);
  }

  const api = 'https://api.unsplash.com/search/photos/';
  const accessKey = 'SsOq-D7E1wQ1TWdAR9UnbCrzKUOjHu1E5-0eAz9rKzM';
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  const chooseImage = async (src) => {
    console.log(src, props.imageType);
    if (props.imageType === 'unsplash') {
      try {
        // 下載圖片為 Blob
        const response = await axios.get(src, {
          responseType: "blob",
        });

        // 建立 File 對象
        const blob = response.data;
        const file = new File([blob], "image.jpg", { type: blob.type });

        // 建立 FormData
        const data = new FormData();
        data.append("file", file);

        // 上傳圖片到後端
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/upload?type=images`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        props.onData(res.data.data);
        console.log(res.data.data);
      } catch (e) {
        console.error('upload error', e);
      }
    } else {
      props.onData(src);
    }
  };

  const getPhotos = async (page = 1, isNew = true) => {
    try {
      setIsLoading(true);
      const result = await axios.get(`${api}?client_id=${accessKey}&query=${props.filterValue}&page=${page}`);
      props.setUnsplashImages((preData) => {
        if (isNew) {
          return [...result.data.results];
        }
        return [...preData, ...result.data.results];
      });
      props.currentPage.current = page;
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }

  const scrollEvent = (evt) => {
    const target = evt.target;
    const height = target.scrollHeight - target.clientHeight;
    if (!isLoading && target.scrollTop >= height && props.filterValue !== '') {
      props.currentPage.current++;
      getPhotos(props.currentPage.current, false);
    }
  };

  useEffect(() => {
    if (props.filterValue === '') return;
    if (props.currentPage.current > 1) {
      // 不重新呼叫 API，保留現有內容
      return;
    }
    getPhotos(1, true);
  }, [props.filterValue]);

  useEffect(() => {
    if (props.imageType === 'unsplash' && listRef.current) {
      const scrollContainer = listRef.current;
      scrollContainer.addEventListener('scroll', scrollEvent);

      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', scrollEvent);
        }
      };
    }
  }, [props.imageType, props.filterValue]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ textAlign: "left", color: theme.palette.grey[400], marginBottom: 2 }}>
        選擇一張能代表專案的圖片，讓你的合作夥伴更了解你想做什麼！
      </Typography>
      <Box sx={
        {
          borderRadius: 3,
          border: `1px solid ${theme.palette.grey[200]}`,
          padding: "4px 12px",
        }
      }>
        <Box sx={{
          display: "flex", borderBottom: `1px solid ${theme.palette.grey[200]}`
        }}>
          <TabButton
            onClick={() => chooseImageType("upload")}
            isActive={props.imageType === "upload"}
            iconSrc="/upload_icon.svg"
            label="從電腦上傳"
          />
          <TabButton
            onClick={() => chooseImageType("coside")}
            isActive={props.imageType === "coside"}
            iconSrc="/coside_icon.svg"
            label="CoSide"
          />
          <TabButton
            onClick={() => chooseImageType("unsplash")}
            isActive={props.imageType === "unsplash"}
            iconSrc="/unsplash_icon.svg"
            label="Unsplash"
          />
        </Box>
        <Box
          sx={{
            marginTop: 1.5,
            height: "260px",
            overflow: "hidden",
          }}
        >
          {props.imageType === 'upload' && (<Box sx={{ width: "100%", height: "100%" }}>
            <StyledUploadWrapper>
              {
                props.previewImage
                  ? (<Box sx={{ position: 'relative', width: '100%', height: '100%', padding: 0 }}>
                    <Image src={props.previewImage} alt="upload image" fill style={{ objectFit: "cover" }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: '28px',
                        height: '28px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '50%',
                        padding: '4px',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                      onClick={deleteImage}
                    >
                      <Image src="/delete.svg" alt="delete image" width={20} height={20} />
                    </Box>
                  </Box>)
                  : (
                    <>
                      <Typography variant="body2" color="grey.500" sx={{ lineHeight: 1.6 }}>圖片尺寸：1125 × 660 px</Typography>
                      <Typography variant="body2" color="grey.500" sx={{ lineHeight: 1.6 }}>檔案大小：小於 5 Mb</Typography>
                      <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        className={isHover ? "is-hover" : ""}
                        onClick={() => inputRef.current?.click()}
                        onDragEnter={() => setIsHover(true)}
                        onDragLeave={() => setIsHover(false)}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        onDragOver={(e) => stopDefault(e)}
                        onDrop={handleDrop}
                        sx={{ mt: '10px', maxWidth: '178px', width: '100%' }}
                      >上傳圖片</Button>
                      <FormHelperText error={!!error}>{error}</FormHelperText>
                    </>
                  )

              }
              <input type="file" ref={inputRef} accept=".jpg, .png, .jpeg" onChange={handleChange} />
            </StyledUploadWrapper>
          </Box>)}
          {props.imageType === 'coside' && (
            <Box sx={{ height: "260px", overflowY: "auto", overflowX: "hidden" }}>
              <ImageGrid
                images={cosideDefaultImages}
                getImageSrc={(item) => item}
                onImageClick={chooseImage}
                activeIndex={props.activeIndex}
                setActiveIndex={props.setActiveIndex}
              />
            </Box>
          )}
          {props.imageType === 'unsplash' && (<Box sx={{ height: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: theme.palette.grey[400] }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="搜尋圖片..."
                inputProps={{ 'aria-label': 'search' }}
                value={props.searchValue} // 綁定 value
                onChange={handleSearchChange} // 處理輸入變化
                onKeyDown={(e) => e.key === 'Enter' && onSearch(e)}
                sx={{ color: theme.palette.grey[400] }}
              />
            </Search>
            <Box sx={{ height: "208px", overflowY: "auto", overflowX: "hidden", marginTop: 1.5 }} ref={listRef}>
              <ImageGrid
                images={props.unsplashImages}
                getImageSrc={(item) => item.urls.raw}
                getImageKey={(item) => item.urls.raw}
                onImageClick={chooseImage}
                activeIndex={props.activeIndex}
                setActiveIndex={props.setActiveIndex}
              />
            </Box>
          </Box>)}
        </Box>
      </Box>
    </Box>
  )
}