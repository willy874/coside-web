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
import { get } from "http";
import { filter } from "@mdxeditor/editor";

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
  // transition: "color .15s, background .15s",
  // cursor: "pointer",

  // "&.is-hover": {
  //   borderColor: theme.palette.secondary.dark,
  //   background: alpha(theme.palette.secondary.dark, 0.1),
  // },

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
    // vertical padding + font size from searchIcon
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

// components
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
          textTransform: "none", // 移除大寫樣式
        }}>{label}</Typography>
    </Button>
  );
};

const ImageGrid = ({
  images,
  getImageSrc,
  getImageKey,
  imageWidth = 135,
  imageHeight = 80,
  onImageClick,
  selected,
}) => {
  return (
    <Grid container spacing={1.5} sx={{ marginTop: "-11px" }}>
      {images.map((item, index) => (
        <Grid
          item
          xs={6}
          sm={3}
          key={getImageKey ? getImageKey(item) : item + index}
        >
          <Box
            onClick={() => onImageClick && onImageClick(item)}
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
              ...(selected && {
                border: `1px solid ${theme.palette.secondary.dark}`,
                outline: `1px solid ${theme.palette.secondary.dark}`,
              })
            }}
          >
            <StyledImage
              src={getImageSrc(item)}
              alt={`image ${index + 1}`}
              width={imageWidth}
              height={imageHeight}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default function UploadImage(props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [imageType, setImageType] = useState('upload');
  const { setToken, token, isAuthenticated } = useLoginStore();

  const stopDefault = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFile = async (_file: File | null = null) => {
    setError('');
    setFile(_file);
    if (!_file) {
      setPreviewImage('');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function () {
      if (typeof this.result === 'string') setPreviewImage(this.result);
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
    } catch (e) {
      console.error('upload error', e);
    }

    fileReader.readAsDataURL(_file);
  };

  const deleteImage = () => {
    props.onData('');
    setPreviewImage('');
  }

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    stopDefault(e);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    handleFile(e.target.files?.[0]);
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearch = (e) => {
    if (e.target.value.trim() === '') console.log('請輸入搜尋內容');
    else {
      setFilterValue(e.target.value);
    };
  }

  const chooseImageType = (type: string) => {
    setImageType(type);
  }

  // Unsplash
  // unsplash API: https://unsplash.com/developers
  // 請使用自行申請的 API 來進行運作
  const api = 'https://api.unsplash.com/search/photos/';
  const accessKey = 'SsOq-D7E1wQ1TWdAR9UnbCrzKUOjHu1E5-0eAz9rKzM';

  // #1 剩餘次數
  // #2 讀取效果
  // #3 展開的 Modal

  const [unsplashImages, setUnsplashImages] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [photoUrl, setPhotoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const currentPage = useRef(1)
  const listRef = useRef(null);

  const getSinglePhoto = (id) => {
    (async () => {
      const api = 'https://api.unsplash.com/photos/'
      const result = await axios(`${api}${id}?client_id=${accessKey}`);
      setPhotoUrl(result.data.urls.regular)
      console.log(result, photoUrl);
    })();
  }

  const getPhotos = async (page = 1, isNew = true) => {
    try {
      // 搜尋特定需要加入 query
      setIsLoading(true);
      const result = await axios.get(`${api}?client_id=${accessKey}&query=${filterValue}&page=${page}`);
      setUnsplashImages((preData) => {
        console.log('更新資料觸發');
        if (isNew) {
          return [...result.data.results];
        }
        return [...preData, ...result.data.results];
      });
      currentPage.current = page; // 每次都需要確認當前頁
      setRemaining(result.headers['x-ratelimit-remaining']);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }

  const scrollEvent = (evt) => {
    const target = evt.target;
    const height = target.scrollHeight - target.clientHeight; // 滾動區塊的總高度
    if (!isLoading && target.scrollTop >= height && filterValue !== '') {
      currentPage.current++;
      getPhotos(currentPage.current, false);
    }
  };

  useEffect(() => {
    if (filterValue === '') return;
    getPhotos(1, true);
  }, [filterValue]);

  useEffect(() => {
    if (imageType === 'unsplash' && listRef.current) {
      const scrollContainer = listRef.current;
      scrollContainer.addEventListener('scroll', scrollEvent);

      return () => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', scrollEvent);
        }
      };
    }
  }, [imageType, filterValue]);

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
          display: "flex", borderBottom: `
        1px solid ${theme.palette.grey[200]}`
        }}>
          <TabButton
            onClick={() => chooseImageType("upload")}
            isActive={imageType === "upload"}
            iconSrc="/upload_icon.svg"
            label="從電腦上傳"
          />
          <TabButton
            onClick={() => chooseImageType("coside")}
            isActive={imageType === "coside"}
            iconSrc="/coside_icon.svg"
            label="CoSide"
          />
          <TabButton
            onClick={() => chooseImageType("unsplash")}
            isActive={imageType === "unsplash"}
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
          {imageType === 'upload' && (<Box sx={{ width: "100%", height: "100%" }}>
            <StyledUploadWrapper
            >
              {
                previewImage
                  ? (<Box sx={{ position: 'relative', width: '100%', height: '100%', padding: 0 }}>
                    <Image src={previewImage} alt="upload image" fill style={{ objectFit: "cover" }} />
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
                      {/* <Image src="/cloud-upload.svg" alt="upload image" width={59} height={59} /> */}
                      {/* <Typography variant="body2" color="grey.500">圖片格式：jpg、png、jpeg</Typography> */}
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
          {imageType === 'coside' && (
            <Box sx={{ height: "260px", overflowY: "auto", overflowX: "hidden" }}>
              <ImageGrid
                images={cosideDefaultImages}
                getImageSrc={(item) => item}
                onImageClick={(item) => handleImageClick(item)}
              />
            </Box>
          )}
          {imageType === 'unsplash' && (<Box sx={{ height: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: theme.palette.grey[400] }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="搜尋圖片..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue} // 綁定 value
                onChange={handleSearchChange} // 處理輸入變化
                onKeyDown={(e) => e.key === 'Enter' && onSearch(e)}
                sx={{ color: theme.palette.grey[400] }}
              />
            </Search>
            <Box sx={{ height: "208px", overflowY: "auto", overflowX: "hidden", marginTop: 1.5 }} ref={listRef}>
              <ImageGrid
                images={unsplashImages}
                getImageSrc={(item) => item.urls.raw}
                getImageKey={(item) => item.urls.raw}
                onImageClick={(item) => handleImageClick(item)}
              />
            </Box>
          </Box>)}
        </Box>
      </Box>
    </Box>
  )
}