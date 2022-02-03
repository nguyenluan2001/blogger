const universities = [
    {
        "id": 70,
        "name": "Đại Học Bách Khoa Hà Nội",
        "code": "BKA"
    },
    {
        "id": 71,
        "name": "Đại Học Tôn Đức Thắng",
        "code": "DTT"
    },
    {
        "id": 72,
        "name": "Học Viện An Ninh Nhân Dân",
        "code": "ANH"
    },
    {
        "id": 73,
        "name": "Đại Học Công Nghệ – Đại Học Quốc Gia Hà Nội",
        "code": "QHI"
    },
    {
        "id": 74,
        "name": "Đại Học Bách Khoa – Đại Học Quốc Gia TPHCM",
        "code": "QSB"
    },
    {
        "id": 75,
        "name": "Đại Học Công Nghệ Thông Tin – Đại Học Quốc Gia TPHCM",
        "code": "QSC"
    },
    {
        "id": 76,
        "name": "Đại Học Kinh Tế Quốc Dân",
        "code": "KHA"
    },
    {
        "id": 77,
        "name": "Học Viện Công Nghệ Bưu Chính Viễn Thông ( Phía Bắc )",
        "code": "BVH"
    },
    {
        "id": 78,
        "name": "Đại Học Sư Phạm Kỹ Thuật TPHCM",
        "code": "SPK"
    },
    {
        "id": 79,
        "name": "Đại Học Khoa Học Xã Hội và Nhân Văn – Đại Học Quốc Gia Hà Nội",
        "code": "QHX"
    },
    {
        "id": 80,
        "name": "Học Viện Kỹ Thuật Mật Mã",
        "code": "KMA"
    },
    {
        "id": 81,
        "name": "Đại Học Công Nghiệp Hà Nội",
        "code": "DCN"
    },
    {
        "id": 82,
        "name": "Đại Học Kinh Tế TPHCM",
        "code": "KSA"
    },
    {
        "id": 83,
        "name": "Đại Học Hà Nội",
        "code": "NHF"
    },
    {
        "id": 84,
        "name": "Đại Học Thương Mại",
        "code": "TMA"
    },
    {
        "id": 85,
        "name": "Học Viện Công Nghệ Bưu Chính Viễn Thông (phía Nam)",
        "code": "BVS"
    },
    {
        "id": 86,
        "name": "Đại Học Sư Phạm Kỹ Thuật Vĩnh Long",
        "code": "VLU"
    },
    {
        "id": 87,
        "name": "Đại Học Giao Thông Vận Tải TPHCM",
        "code": "GTS"
    },
    {
        "id": 88,
        "name": "Học Viện Kĩ Thuật Quân Sự - Hệ Dân sự",
        "code": "DQH"
    },
    {
        "id": 89,
        "name": "Đại Học Giao Thông Vận Tải ( Cơ sở Phía Bắc )",
        "code": "GHA"
    },
    {
        "id": 90,
        "name": "Đại Học Xây Dựng Hà Nội",
        "code": "XDA"
    },
    {
        "id": 91,
        "name": "Đại Học FPT",
        "code": "FPT"
    },
    {
        "id": 92,
        "name": "Đại Học Việt Đức",
        "code": "VGU"
    },
    {
        "id": 93,
        "name": "Đại Học Mở TPHCM",
        "code": "MBS"
    },
    {
        "id": 94,
        "name": "Đại Học Bách Khoa – Đại Học Đà Nẵng",
        "code": "DDK"
    },
    {
        "id": 95,
        "name": "Đại Học Sài Gòn",
        "code": "SGD"
    },
    {
        "id": 96,
        "name": "Đại học Sư phạm Kỹ thuật - Đại học Đà Nẵng",
        "code": "DSK"
    },
    {
        "id": 97,
        "name": "Viện Đại Học Mở Hà Nội",
        "code": "MHN"
    },
    {
        "id": 98,
        "name": "Đại học Thủ Đô Hà Nội",
        "code": "HNM"
    },
    {
        "id": 99,
        "name": "Học Viện Nông Nghiệp Việt Nam",
        "code": "HVN"
    },
    {
        "id": 100,
        "name": "Đại Học Khoa Học Tự Nhiên – Đại Học Quốc Gia TPHCM",
        "code": "QST"
    },
    {
        "id": 101,
        "name": "Đại Học Sư Phạm Hà Nội 2",
        "code": "SP2"
    },
    {
        "id": 102,
        "name": "Đại Học Quốc Tế – Đại Học Quốc Gia TPHCM",
        "code": "QSQ"
    },
    {
        "id": 103,
        "name": "Đại Học Ngoại Ngữ – Tin Học TPHCM",
        "code": "DNT"
    },
    {
        "id": 104,
        "name": "Đại Học Nông Lâm TPHCM",
        "code": "NLS"
    },
    {
        "id": 105,
        "name": "Đại Học Cần Thơ",
        "code": "TCT"
    },
    {
        "id": 106,
        "name": "Đại Học Công Nghiệp TPHCM",
        "code": "HUI"
    },
    {
        "id": 107,
        "name": "Đại Học Thủy Lợi ( Cơ sở 1 )",
        "code": "TLA"
    },
    {
        "id": 108,
        "name": "Đại Học Khoa Học Và Công Nghệ Hà Nội",
        "code": "KCN"
    },
    {
        "id": 109,
        "name": "Đại học Công nghệ Giao thông vận tải",
        "code": "GTA"
    },
    {
        "id": 110,
        "name": "Đại Học Kinh Tế Kỹ Thuật Công Nghiệp",
        "code": "DKK"
    },
    {
        "id": 111,
        "name": "Đại Học Phenikaa",
        "code": "DTA"
    },
    {
        "id": 112,
        "name": "Học Viện Hàng Không Việt Nam",
        "code": "HHK"
    },
    {
        "id": 113,
        "name": "Đại Học Sư Phạm TPHCM",
        "code": "SPS"
    },
    {
        "id": 114,
        "name": "Đại học Công Nghệ TPHCM",
        "code": "DKC"
    },
    {
        "id": 115,
        "name": "Đại Học Kiến Trúc Hà Nội",
        "code": "KTA"
    },
    {
        "id": 116,
        "name": "Đại Học Đông Á",
        "code": "DAD"
    },
    {
        "id": 117,
        "name": "Đại Học Giao Thông Vận Tải ( Cơ sở Phía Nam)",
        "code": "GSA"
    },
    {
        "id": 118,
        "name": "ĐH Tài Nguyên môi trường TPHCM",
        "code": "DTM"
    },
    {
        "id": 119,
        "name": "Khoa Quốc Tế – Đại Học Quốc Gia Hà Nội",
        "code": "QHQ"
    },
    {
        "id": 120,
        "name": "Đại Học Sư Phạm Hà Nội",
        "code": "SPH"
    },
    {
        "id": 121,
        "name": "Đại Học Kinh Tế -Tài Chính TPHCM",
        "code": "UEF"
    },
    {
        "id": 122,
        "name": "Đại Học Sư Phạm – Đại Học Đà Nẵng",
        "code": "DDS"
    },
    {
        "id": 123,
        "name": "Đại Học Thăng Long",
        "code": "DTL"
    },
    {
        "id": 124,
        "name": "Đại Học Công Nghiệp Thực Phẩm TP HCM",
        "code": "DCT"
    },
    {
        "id": 125,
        "name": "Đại Học Điện Lực",
        "code": "DDL"
    },
    {
        "id": 126,
        "name": "Đại học Kỹ Thuật Công Nghệ Cần Thơ",
        "code": "KCC"
    },
    {
        "id": 127,
        "name": "Đại Học Nguyễn Trãi",
        "code": "NTU"
    },
    {
        "id": 128,
        "name": "Đại Học Quốc Tế Hồng Bàng",
        "code": "HIU"
    },
    {
        "id": 129,
        "name": "Đại học Công Nghệ Thông Tin và Truyền Thông – Đại Học Thái Nguyên",
        "code": "DTC"
    },
    {
        "id": 130,
        "name": "Đại Học Thái Bình",
        "code": "DTB"
    },
    {
        "id": 131,
        "name": "Đại Học Kinh Doanh và Công Nghệ Hà Nội",
        "code": "DQK"
    },
    {
        "id": 132,
        "name": "Đại Học Tài Chính Ngân Hàng Hà Nội",
        "code": "FBU"
    },
    {
        "id": 133,
        "name": "Đại Học An Giang",
        "code": "TAG"
    },
    {
        "id": 134,
        "name": "Đại Học Dân Lập Hải Phòng",
        "code": "DHP"
    },
    {
        "id": 135,
        "name": "Đại Học Sư Phạm – Đại Học Huế",
        "code": "DHS"
    },
    {
        "id": 136,
        "name": "Đại Học Kinh Tế Công Nghiệp Long An",
        "code": "DLA"
    },
    {
        "id": 137,
        "name": "Đại học Nam Cần Thơ",
        "code": "DNC"
    },
    {
        "id": 138,
        "name": "Đại Học Nội Vụ",
        "code": "DNV"
    },
    {
        "id": 139,
        "name": "Đại Học Quảng Bình",
        "code": "DQB"
    },
    {
        "id": 140,
        "name": "Đại Học Hoa Sen",
        "code": "DTH"
    },
    {
        "id": 141,
        "name": "Đại Học Văn Hiến",
        "code": "DVH"
    },
    {
        "id": 142,
        "name": "Đại Học Dân Lập Văn Lang",
        "code": "DVL"
    },
    {
        "id": 143,
        "name": "Học Viện Quản Lý Giáo Dục",
        "code": "HVQ"
    },
    {
        "id": 144,
        "name": "Đại Học Mỏ Địa Chất",
        "code": "MDA"
    },
    {
        "id": 145,
        "name": "Đại Học Nguyễn Tất Thành",
        "code": "NTT"
    },
    {
        "id": 146,
        "name": "Đại học Sao Đỏ",
        "code": "SDU"
    },
    {
        "id": 147,
        "name": "Đại Học Sư Phạm Kỹ Thuật Hưng Yên",
        "code": "SKH"
    },
    {
        "id": 148,
        "name": "Đại Học Đà Lạt",
        "code": "TDL"
    },
    {
        "id": 149,
        "name": "Đại Học Quốc Tế Sài Gòn",
        "code": "TTQ"
    },
    {
        "id": 150,
        "name": "Đại Học Kinh Bắc",
        "code": "UKB"
    },
    {
        "id": 151,
        "name": "Đại Học Công Nghệ và Quản Lý Hữu Nghị",
        "code": "DCQ"
    },
    {
        "id": 152,
        "name": "Đại Học Gia Định",
        "code": "DCG"
    },
    {
        "id": 153,
        "name": "Đại Học Đại Nam",
        "code": "DDN"
    },
    {
        "id": 154,
        "name": "Đại Học Sư Phạm Kỹ Thuật Vinh",
        "code": "SKV"
    },
    {
        "id": 155,
        "name": "Đại học Thành Đô",
        "code": "TDD"
    },
    {
        "id": 156,
        "name": "Phân Hiệu Đại Học Đà Nẵng tại Kon Tum",
        "code": "DDP"
    },
    {
        "id": 157,
        "name": "Đại Học Bà Rịa – Vũng Tàu",
        "code": "BVU"
    },
    {
        "id": 158,
        "name": "Đại Học Bạc Liêu",
        "code": "DBL"
    },
    {
        "id": 159,
        "name": "Đại Học Công Nghệ Đồng Nai",
        "code": "DCD"
    },
    {
        "id": 160,
        "name": "Đại Học Cửu Long",
        "code": "DCL"
    },
    {
        "id": 161,
        "name": "Đại Học Công Nghệ Đông Á",
        "code": "DDA"
    },
    {
        "id": 162,
        "name": "Đại Học Dân Lập Duy Tân",
        "code": "DDT"
    },
    {
        "id": 163,
        "name": "Đại học Hùng Vương - TPHCM",
        "code": "DHV"
    },
    {
        "id": 164,
        "name": "Đại Học Kinh Tế Kỹ Thuật Bình Dương",
        "code": "DKB"
    },
    {
        "id": 165,
        "name": "Đại Học Lạc Hồng",
        "code": "DLH"
    },
    {
        "id": 166,
        "name": "Đại học Tài Nguyên và Môi Trường Hà Nội",
        "code": "DMT"
    },
    {
        "id": 167,
        "name": "Đại Học Dân Lập Phương Đông",
        "code": "DPD"
    },
    {
        "id": 168,
        "name": "Đại Học Phan Thiết",
        "code": "DPT"
    },
    {
        "id": 169,
        "name": "Đại Học Phú Yên",
        "code": "DPY"
    },
    {
        "id": 170,
        "name": "Đại Học Quy Nhơn",
        "code": "DQN"
    },
    {
        "id": 171,
        "name": "Đại Học Công Nghệ Sài Gòn",
        "code": "DSG"
    },
    {
        "id": 172,
        "name": "Đại Học Tây Đô",
        "code": "DTD"
    },
    {
        "id": 173,
        "name": "Đại Học Việt Bắc",
        "code": "DVB"
    },
    {
        "id": 174,
        "name": "Đại Học Trà Vinh",
        "code": "DVT"
    },
    {
        "id": 175,
        "name": "Đại Học Công Nghệ Vạn Xuân",
        "code": "DVX"
    },
    {
        "id": 176,
        "name": "Đại Học Yersin Đà Lạt",
        "code": "DYD"
    },
    {
        "id": 177,
        "name": "Đại Học Quốc Tế Miền Đông",
        "code": "EIU"
    },
    {
        "id": 178,
        "name": "Đại Học Hồng Đức",
        "code": "HDT"
    },
    {
        "id": 179,
        "name": "Đại Học Hạ Long",
        "code": "HLU"
    },
    {
        "id": 180,
        "name": "Đại Học Kiến Trúc Đà Nẵng",
        "code": "KTD"
    },
    {
        "id": 181,
        "name": "Đại Học Lâm Nghiệp ( Cơ sở 1 )",
        "code": "LNH"
    },
    {
        "id": 182,
        "name": "Đại Học Đồng Tháp",
        "code": "SPD"
    },
    {
        "id": 183,
        "name": "Đại Học Thái Bình Dương",
        "code": "TBD"
    },
    {
        "id": 184,
        "name": "Đại học Thủ Dầu Một",
        "code": "TDM"
    },
    {
        "id": 185,
        "name": "Đại Học Vinh",
        "code": "TDV"
    },
    {
        "id": 186,
        "name": "Đại Học Hải Phòng",
        "code": "THP"
    },
    {
        "id": 187,
        "name": "Đại Học Hùng Vương",
        "code": "THV"
    },
    {
        "id": 188,
        "name": "Đại học Kiên Giang",
        "code": "TKG"
    },
    {
        "id": 189,
        "name": "Đại Học Tây Bắc",
        "code": "TTB"
    },
    {
        "id": 190,
        "name": "Đại Học Tây Nguyên",
        "code": "TTN"
    },
    {
        "id": 191,
        "name": "Đại Học Công Nghiệp Việt Hung",
        "code": "VHD"
    },
    {
        "id": 192,
        "name": "Đại học Công nghiệp Vinh",
        "code": "DCV"
    },
    {
        "id": 193,
        "name": "Đại Học Bình Dương",
        "code": "DBD"
    },
    {
        "id": 194,
        "name": "Phân Hiệu Đại Học Huế tại Quảng Trị",
        "code": "DHQ"
    },
    {
        "id": 195,
        "name": "Đại Học Dân Lập Phú Xuân",
        "code": "DPX"
    },
    {
        "id": 196,
        "name": "Đại Học Kỹ Thuật Công Nghiệp – Đại Học Thái Nguyên",
        "code": "DTK"
    },
    {
        "id": 197,
        "name": "Đại Học Hà Tĩnh",
        "code": "HHT"
    },
    {
        "id": 198,
        "name": "Đại Học Công Nghiệp Việt Trì",
        "code": "VUI"
    },
    {
        "id": 199,
        "name": "Đại Học Khoa Học – Đại Học Huế",
        "code": "DHT"
    },
    {
        "id": 200,
        "name": "Đại Học Công Nghiệp Quảng Ninh",
        "code": "DDM"
    },
    {
        "id": 201,
        "name": "Đại Học Hải Dương",
        "code": "DKT"
    },
    {
        "id": 202,
        "name": "Đại Học Phạm Văn Đồng",
        "code": "DPQ"
    },
    {
        "id": 203,
        "name": "Đại Học Quang Trung",
        "code": "DQT"
    },
    {
        "id": 204,
        "name": "Đại Học Quảng Nam",
        "code": "DQU"
    },
    {
        "id": 205,
        "name": "Đại Học Tiền Giang",
        "code": "TTG"
    },
    {
        "id": 206,
        "name": "Đại Học Thành Đông",
        "code": "DDB"
    },
    {
        "id": 207,
        "name": "Đại Học Lương Thế Vinh",
        "code": "DTV"
    },
    {
        "id": 208,
        "name": "Đại Học Hòa Bình",
        "code": "ETU"
    },
    {
        "id": 209,
        "name": "Đại Học Sư Phạm Kỹ Thuật Nam Định",
        "code": "SKN"
    },
    {
        "id": 210,
        "name": "Đại Học Nha Trang",
        "code": "TSN"
    },
    {
        "id": 211,
        "name": "ĐH Tân Tạo",
        "code": "TTU"
    },
    {
        "id": 212,
        "name": "Other",
        "code": "other"
    },
    {
        "id": 213,
        "name": "Học viện CNTT Bách Khoa",
        "code": "BKACAD"
    },
    {
        "id": 214,
        "name": "Học viện Kỹ thuật Quân sự",
        "code": "MTA"
    },
    {
        "id": 215,
        "name": "Đại học Mỏ - Địa chất",
        "code": "HUMG"
    },
    {
        "id": 216,
        "name": "Đại học Công nghệ Thông tin & Truyền thông Thái Nguyên",
        "code": "ICTU"
    },
    {
        "id": 217,
        "name": "FPT Aptech",
        "code": "FPT Aptech"
    },
    {
        "id": 218,
        "name": "FPT Polytechnic",
        "code": "FPT Poly"
    },
    {
        "id": 219,
        "name": "VTC Academy",
        "code": "VTC Academy"
    },
    {
        "id": 220,
        "name": "CodeGym",
        "code": "Codegym"
    },
    {
        "id": 221,
        "name": "Hệ Thống Đào tạo CNTT - T3H",
        "code": "T3H"
    },
    {
        "id": 222,
        "name": "Trường Đại học Bách khoa - Đại học Đà Nẵng",
        "code": "DUT"
    },
    {
        "id": 223,
        "name": "Trường Đại học Sư phạm, Đại học Đà Nẵng",
        "code": "UED"
    },
    {
        "id": 224,
        "name": "Trường Đại Học Duy Tân",
        "code": "DTU"
    },
    {
        "id": 225,
        "name": "Trường Đại học Công nghệ Thông tin",
        "code": "UIT"
    },
    {
        "id": 226,
        "name": "Trường Đại học Công nghệ Sài Gòn",
        "code": "STU"
    },
    {
        "id": 227,
        "name": "Đại học Bách Khoa Hồ Chí Minh",
        "code": "HCMUT"
    },
    {
        "id": 228,
        "name": "Địa học khoa học tự nhiên - ĐHQG TPHCM",
        "code": "HCMUS"
    }
]
export {universities}