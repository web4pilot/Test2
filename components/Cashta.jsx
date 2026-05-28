"use client";

import React, { useState, useEffect } from "react";

/* ============================================================
   CASHTA — Trusted Value Movement
   Light theme · winged-money logo · 6 currencies · full-screen map
   Regional merchants per currency. No fake status bar.
   ============================================================ */

// embedded logo (winged money mark)
const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAYAAAAbWs+BAAA9BklEQVR42u19e1yU55n2JYdhIDMwIzODchoGUARBYMV4gFCkhpiazWc1qfVLoq3Vpkm3sW2ybdPGhNQkTbLtdk3apGnYpJj059oNlmbjNiEWifGUBD9AUUTRAVGUAWRgJjDMgH5/vDwPz/vOcFLmhM/1++UXHYQZZt7rve/nuu/7umcMDQ1dBwcHh0cQwN8CDg5OOA4OTjgODg5OOA4OTjgODg5OOA4OTjgODk44Dg4OTjgODk44Dg4OTjgODk44Dg5OOA4ODk44Dg5OOA4ODk44Dg5OOA4ODk44Dg5OOA4OTjgODg5OOA4OTjgODg5OOA4OTjgODk44Dg4OTjgODk44Dg4OTjgODk44Dg4OTjgODk44Dg5OOA4ODk44Dg5OOA4ODk44Dg5fQBB/CzwLk8mEigPvAwBys5fCkDSfvymccBzuwLvvleDxbT9CZ0sfAECuDoBOp8HyO/KwbWsxJ98tgBlDQ0PX+dvgGbJt3PAwNPowrLpzJQCg3dKCqooa2LqvQa4OQEFRNtav+i6K8u+FTqe7Zd8r47mTiAmqhUz/ACccx43BkD0bFxpNaDpxXBTJjOdO4lDNEWx7fhsuNJoAgJKyMP+uW5J89pY/o6eiGNotZznhOG7s3Lb4rkykZcVh79ufjxkFKw98hH2VVbh0/ioAYE5WFJbl5N5S5DPvXQ9HWzWsheXTLs3mhPNQipSen4V1a1fjrVf+e0IErTjwPioPfITdZeWwdV8DAMSn6LD8jjwU5t81rQUXTjiOmyZccsYCbNy8ZkKEk37voZojTuRj087pRD7juZNQVK5GcHQOZFo9wm5/kROO48bOcEOOQXzyt6obJgdLPjbtZNVOf089yfktoqh4Wp7jOOE8hE2P3Y/Skj0o3fkGHrxv85ScC0nauf/TgzCZOmn0i0mciRWFBX4Z/TrenIPg6Bx0z3sKisrViCgqnlZqJSech0DKAjeSVk42+u3/9CBVPOXqACzITEZqcrrPRz82ugFAX/0HcLRVT6soxwnnx1FuouRjox8rvLjzNdws2Qh6KoS/TxcBhRPOw4JAen4WdDoNKt/b55ELaDTykXPf9l9s92raaW/5M41kt2WuRVBUhtO/IV+PKCrGpcEsvyYeJ5yXUsv4FB0++6jO4+kdqfWxaSc583mqvYwlGQAER+cgLP2ecb+PRLvg6BwAQPe8p/yOfJxwXkwtF61IwvslB71ypmJFl9KSPQBGSg0vPvV7t74mUmcj5JFp9S4j22iRjsAf00xOOC+SbndZOU3rvHmeIlGP1PliEmfiheJfuf01kZ5JErmk5zcp0Ugk9Oe0khPOB0hn676GjZvXeH1i4N33SrBr7x9RVVEDAFi3drXbox0l1ec/w5d1ZdNeNOEDqF5GpFqFlesWorRkD5bcswQ/f3kTjOdOeuW1PHjfZux9+3O8seN1RKpVKC3Zg8V3ZXrk9YTd/iKCo3MowUhkAwDtlrPTppOGE85LMJlM2F1WjoxFBux9+3OU7nwDiYZYvFRciuSMBdj02P14970SmEwmrxDvk79VYeW6hTCZOrHkniV4970Stz+vatUuAMBg+wkAoMrkdAInnBdh676GKKWeXuRH/rcBpTvfwMbNa1BasgcbNzyMjK8keYV8hqT52Pv251i3djU6W/rw8NZHUFn3mtufN6KoGF/WlVHSTbbLxFvZAT/D+UGEW3xXJpbfkeey84TUz36382V8se8cAKFrZN3a1R5v2SJnzUi16qZ6QSdKGEXlakq+yRLOvHe9T5cLOOG8iKVfS0W3uQenD7eNexFKJwbk6gBkLDTgXzb8xCPkI6WM+BQdjDWX3fpcNzOe0/HmHJ/uv+SEm0RE+tLSgUM1RwAAlQc+En293dJC00MCEoluU2pdKn3kIpZOgY/3Okj9jEwMkMjnTpWTROQLjSb8tHgjXvjJW257r4liOVnCmfeuh0yrh72jxWejHCfcGBGFEOtUcx3aznejq9tMexIng9G692+2odlV8Xrj5jVuk/KN506i8L4VMJk6UX+g1m0X9GQtFsi/Z1vDeiqK6dSBLxHvliccG7kIuYxnL1NnLXJ2ilSrEJ2oRlpCJmbFKpGWuAyAYHXHovXyVVy40iiKgtIeRnIOe/C+zVhy71x8se/cpKLcaGTYvqOYFtPd1atJorK7ph5Y4WOir58U0PvqP0BY+j0YbD8Be0eLTxbJbynCScnVbmnBiS+MdJCTkIsMc04kLZxsJGJ7GDduXgMAU3oBkyg05BhEdeXJKY90JpMJOYXz0dVtdmuUu9HI2Ff/gU9Pik9bwo1GLmlaqNGHwTBnNtISMim5JnN3vVHyseqjRh8Ga68Nb+x4fcraqTY9dr/bRnA8EeVuFFw08YKQsf/Tg+izWUVpITlLkbRwKiLXzeLd90qw7fltMJk6oQiXTznp3HnGTc/PQqRa5ZYoerNRzpd7LX2GcKSo+6WlY+SDtX6CtrMy+ndCqHZLC07Vtg5/X6eTkBGfIlwAy+/Io+ctb5NrrN/7Z899H7vLyulj/kA6Tw3TTjd4lXDvvleC3+18Ge2tFvTZrAAAa68NAMZUA4mIERgcJDprERHDF4k1kffi4a2PAIBPTBBM5PW60zKCE85Nd0giUkTFKREZqXKqZbGKICEUAL8k1URStbsfuhOtLUKUd3dtbSrSSp1O4/ZCOCfcFH1YBUXZ+N1Tb/MlFpL3htS6SLRbfkeex8ZkJgND9my31+SmG7zSvHyo5ghs3deQmZrOPyjpRZw0H5Xv7UOcXksfKy3ZQ5uYfak5d/kdebB1X6OiFYePEi43eynk6gDs2vV3/gmMQrq/v/MxdDoNAKFet+rOlSgt2YPkjAVYcu9cvPteidfJR87Np84f5h/aBBHkrQtq3drVKC3Zg3ffK+Eq1yjv0fZfbMfGDQ9jPw7is4/qsG1rMbbvKMb+Tw9i44aHvTY9IMWVixa3/nxS/iHZEYFddg4H9zVN6mcRTcBb15zXRBPjuZNYcs8ShMkVHrOM80e4UgNdLfuQtox56jNMzliAlesWjrkVaKI/iyUUW1MdcgyO28cqV4+drEm/11vlDK+XBYhlHCfd6Birs8NVA/OiFUk48Oozbu+2YG+ak1EqTSYT6i+/h7azsjGbw+XqACjC5VCrlVCrIqAzKBAZmIBZsUoAQMTMEGh1KjjsQwiWBY75nA77EACg5XwnXiou9Vo5w+uF75+/vAkvFZd6zClqsmmMtPjujTofOxoz1p2ZbWAmxkTuvKhIXyWAMTtO2Hm+U811aG+10H5SQGhUCAmdgaSUWEQp9ZgVq0TyvCgAQGRkBEJCZJCHylz+7GuDAbA7bOO+VlmwHLKQGThz5gK2fPPlW5dwbKQD4PZZq7HIxToUAxBdFNK0hQx/esqrn22nGm/qmhCvtGTPlKR74xEuMDhIFOFYgh2uPoTWlg7Rmq1EQyxmRimRmZoOfaIGt2EuNAm9kIfKEBQYiMGhIdj67S6fc2BA/HhIiMzpMenXWbS1dXDCEdL9vPhJXDp/FfEpOrd2WpA07NT5w6hrqEf10QaXi+7zViRDZk+ikY2APWd48sxEbkwTJRGp6Y1m4zAl4k72bADA9l9spwQ7W9tO38s4vRZJKbGUXLNmz3SKWK7INTBgdyKL6ObHfH9QoDidHBwaoo9LydvSfAWPbvgNJxwhws+e+z49i9xeMBff3/T4TSlw0ujV0FSP43VNouUWUXFKFOblIS1xmc/vVptspz55T6e6Y4XdTS5dFpKWFYfM1HQkz4tCdLSWRi77wPUJpX/k37MEsvXb0dkcDrvsHBz2IZjNFvRcHQAwtkqatyIZCfo4+ryccKPcyaUKHLtwUBpx2KgjVbjYi0H6c/yx73Ki5zl3pbX7T76LN/9Qjs+rzohSxNTkdOStSEZ0tBYKRSgAwGrtnzCx7APXYbH24srlq5RMVy5a0G5pwdV2C7rNPejuttBeWxY6nYb24rKw9toQp9fiP155gj5fY8MFTrjx7qJS/w6pkuVKLtbowxAmVziRdDoooWz7l7snC4znTuLNst9g166/0zOtRh+GnCWpNIol6OMgC5kxJsGk57PO5nBcMh9D4/FOOv1B5H8CRbgcYXIFQkJnQKVRDIsoKgSFiS/ZMKUMve0O0eMzZ92G00fa0W3u8SnCBfnyhWVImg9D0nw8eN9mUbq5cfMaFObfhVPnD+PKRYvLBufp2NzMvi/bf7EdD299BD8vfnLKbySsRd+JY0bYuq9Bow/DynULkZmajrTEZUhId1Dy2B022B2uVcHBoSH0mK1oab6Czw4Y0W5pwbnGi6JoRaR/VZwaGZEGBIVdR5hShj6LHYN9M9DVZcaMwUBcDxqi3wsAYXIF7TmVRryoOKXT1X1t0Ps2rEH+cpHpdDoU5t+F0pI9jFBx63aokKi2ccPDKLxvxZTUMV2l8gVF2chMTcfi3LmIUCmGZfheWJ0zOCgUoZRgdbVn0Xi8Ew1N9ThvvCgil2HObCSlxAoX4HBUIsTq6jLDePSyKHVUhMsREihHWHgw1KoIWj4AQGtygFCXU6mU+O2/v+vy95vI+ZETjgHpwaw88BFvBxsmHSl43yjppCkjWVG8vGApFT1kwXLYHTaq9hEFkUQxq7WfRjC2iA0AcXotDHNmIyougqZ+ANDVZUZ7q0U0FTHkGERMvAY5S1IRpdQjZYEGKpUSwbJAREdrRxVUSPQKCLqGoMBADPRfh7nTStNQX4JfEc6QNB8ZCw3YXVaObVtP8s4UYPgcIiiXdz90J/7+zscTel+k0UyjD8PGzWuwON8AfcIsyENllGAWay8AUDlfoQiF1dqPL744gcbjnbTWRogTnahGdlwCTQvbW3vQWHOJppE6nQYhoTOQlhWH5co8pCzQQKtTiRRNqUJJMFp9DgDApLUqjQIzBgPR1+u4dQhHbKunctXQv2z4CTbuexjbdxTzSWOGdLNiN2HHjndQeN+KUWuYpP647fltTtGMpIzkgu4xW2kdjBCNpIqHa6rRWHMJrS0d9LzEpoiEYAP912EydSJSrUJMvAbLcnJdkosl1ZiEGk5bxxJnZMFyzJqtwnUM4XrQ0K0V4WKCatHjxjQKuJ+Tbhgv/OQtpCUuExqdh7t2COlI5wmr9LqKZj1mKyUYIZmt34662rM4cOgYdT0j57CU7BiaJnZ1mWE8K5y9FOFyoVSQI5QKIiMjEKFSTJpcLm8ur1Vicb4BKanxLr8/IEisWA8M2ZyK6OM1Ovt9ShkTVAtg6tK/F5/6PU411/kM6VwZIHlDJSUEe3jrI8K2m+F6JEkb52RFUYU3Id1BIwW5cFmSkTMZSRcJyUiq2NvuQGPNRRrF4vRaLCmch2XZOZiXqnci2I2QS4q2tg6UluxB19A/YX76pjH/7WhnuPGanP2acGShnjsUy/dLDuLezXmUdJ7y/mBrgwBE5xcCYnAUFadEWkKmR31JHrxvM3Kzl6LwvhW0YycmcSa+/+x9yMyaMyyACCojufOTNqnz5y7h4L4m2jDApovhUcGUZOx5bfkdeTRSsgXvqSAYC3moDE2n2yFXB+Bo5WmcuesCEpNiRKnvaLBc1iAkoXf6p5RkL3Nf/QdTPipCSEdqc/sqq9wybcASTGpZTrtWfizufrlNOWKP8KWlw+PijiFpPj77qI6+NwNDNtoGxUrj5Mz22ZGTOHDoGE7VttJoVVCUTUl2rvEiWitGSLZu7WpRVwlp2Rqvs+SmLtTAQOyvOoI4vRbd3RZsf+ZP2P6L7YhNdRZTZkYpceWymf7dLjsHQOsThHNbpwlZsGAtLJ9y4cSV4sY2Pq9ffze2rH38hiRyAKMSLGOhQWQi6w8q6bvvleDxbT9CZ0sfbi+Yiy3fW425c+PRXB8s6uYnKaMhTUuVRXImi9NrsSwnF4vzDZgzJ2HcrpKpBBFJ/rLzCEpL9uCFV74LrU6FLd98WdTxsjh3Lo3W//brnThV24q0rDhUVdTg1defoGWFtrYO/OCRXyNjoQFH3z8zPQhH1EmyzaSv/gM42qonvA3lRs9RP3vu+9S7nyhwqcnptLUreo4dBsVXKKkIXC3xkBLM15uax/s8/uW5b+PD3ccQkzgTGYsMqD7aAGuvDRkLDYiKi8Bg3wwAoFEuUq3CisICUSTzFMlY/GXnERyuPoTubgu+8+37kV+YDnmoDOfPXcLLL5bibK2QZhJSEcJVH21AzpJUJ8J1Nofj8W0/gmHObK8QLshdZAuOzqGrg8LS70FPW7Vbt1PqdDq89cp/O+1P+7xqDz3LsAqVtP8yJnEmVt25kraJ+TPBXKWYe9/+HO+uEsxmP9x9DBp9GAqKshEUdp1K/IpwOXKWpGJ96t3IL0wXkcwbZGtr68Dejz+ktbsrFy109q3sr/9Aa0sHVq5biLVf/yollHRUBxiZ9gYA5Wyh0N7eavHKZzElEY5dF0TObWHp97gUUdivu9sDXrp7gESz3WXlIvMdclHeCmCHUzX6MACAWq3Espxcql6ONQDqaQwM2HHl8lW8v7cKH+4+Rvs5XyouxU+LN+Jr9y4S3QzkoTLsfOMT7P34Q5cRDgA2PvTMpG0hfCbCkYhG6m0RRcWj/tuw9HuA9HvQU1GMnrZqKAAY4b6znU6nA3Q60c/PzV4q6ce8tWBImo+3XvlvFOYLZztrrw2r7lyJPzy+GgfNPbBabT71ekNCZEhJjceT6d9GZmo6dux4B6dqW3F7wVwnskkjHOnT7DCZkZgUQ28iarXSax0oAVPxAVoLyxFRJGyc7KkoHrUc0Ff/Ad1MGVFU7FYhZTTcptQiJnEmnvv3p2n97FbEg/dtxtEPjkKn06C0ZA++95typ6Kxr8DWb4fV2o+v3bsIBUXZuNBowvKCpbSPUgq2oRkAVWhdZUB+RzhCOpn+AahW7YK1sByOtmon0vVUCJHPWlgO1apdkOkf8Eoap9PpUPzCZpytbcd//OlnuJVBXJ7jU3TYXVaOxoYLo5r1+ArycxcCADUZGg3SQdWgwEB6/lOrItDVbRY1KvgV4VxFPEdbNQbbT9DIBgCqVbt84qy0fP6DiE/R4aXiUrz7XolHn9tkMqGy7jW8+14JNj12PwzZsxGfrkVUqhLx6VoYsmdj02P3e+x1kdk6APjsgNGl6OArsFr7kZk1B6/tfBzR0VqX58zBoSFEzAwRPcZaMMhDZZgZpfTa7xDkrg/RHlSMnopiRBRlwNFWDWth+YRLj0SEcZevIrmzp+dn0RVR7p6aPlRzBLv2/hFVFTW0rhen14p22LGInuM50UJqV+HrGK2PkkCrU9E/K8LlrtPU7mvTh3AAhskinOeCo3MmFdligmrRU1EM7Rb3GZkakubjf/53B771wDPYuOFhVB74aEpbsMj4C1s8j0/R+YQ1uRTbdxTD1n3N6ezjqxhPQSVlAFJbbLe0iL4uDK8ew6GaIx7/DNza2hUcnQNHW/WYyuV4kcGdb0hh5qP45G9fwfoffR2lJXuw9+MPserOlZMmnrRDhXTlA4Lz2I12vrgz4rKvt7RkD24vmIv8wnSv1NummozBssBRI5u3U2a3Eo4UvC8NZsEwie8bbD+B4OicKZ8yGC3SHX3/DN23XVoiFMrjU3QiAyJXcNWhEp+iw4rCAhQWey+Kjbb7XGrWQ9KqlesW4gff/+a0EYOIlygglACutltEiqY3I7nPTXzbW/4Me0cLwtLvcUvT82h48L7NePC+zTQVPFx9CLvLykVdKlKQc9iqO1dSYnqjQ0XaYC2QrnNUn35i1kPMWfUJszCdoEnoRUigHF1dZtHjISGyUUsJ04JwlwazEFNUDK1+/oQuGnJ2IymoTKt3azvYWMRjL+TRotvusvIJWxp4QogBRnwiiRkrWXgBwKUviL+nkKNmV+HBAASrhe7OHnruuzYYQFVMb3jjuJVwwoU4/sVo3rseirZq9A0XxOmLi8pAUFQGHBWr0VEpdLF4KuKR1z8WmUpL9uDNst94dBeC1IskPkVHm6xZ+wIA1PxnsqKDv0MeKoNaFYHrEKJZX6+Dzv7ZHTaoVLd4Stk97ynEpAu9mH31H4j6MElnCu299JEP9RuLQvHzxJnYseMdty/4m4izlsv03GHDrQxzpxVJKbEwnr2Mrq4e+j4FywK9ZrPgE4QjkVCmfwDmvesp6cg8HYky3iabqwsfAH5e/CSi59hRmPnolAof0qWLxIx17de/KkoRRxUPguWidq3pHtnoRR0YKBpClXadREZGQBEuR0NTPRdNVKt2UdJFTPD85y6wFz1bT9Pow3B7wVwsLxAKxrt2/R3//LWt2Lq1Gj/81os3JZqwog2Z9ZpINCP2BsSItaurRzSWIqyEstN/N9HFGv6KKKUe1bYGp1TT1i+klmq1eCr8liUcABrdLs17yqNRjWzm3PdRNeoa6nGqtpX66cckzkRBUTbycxciM2sOAGFeCwDWr78b7+78H7xUXIo95R9iWU4u/vD4aphD7xyXfK72JwCghj95K5LHjGasfR1xOr50oVPk0Q9AtEk0NTmdTm8HBF2btpEvTK6gEwNNp9sxd248jfxqVQSu9JthMpk8qir7/G4Bd6eIh2qO0B0F7AVPIwtjkiMVISIjI9DV1YPkeVEofmEz/vbRPhw/fBG7y8qxu6yc7kYjttwspGt2iUcKmfdKnheFcLUMwQGhIpMccvhXKEJxst6I9/dWOdnXRScKsr8UZAvN3o8/xO4yYahz/fq7seKunGlFvMGhIcyKVQ67OsdCp9OI3j9ZsBwzo5Q4XtckNDDf6oQj5YSpjFykEEzI5WqVVZxei42b14jUPuKXb+u3ixyICeFCQmQ4UFmP/VVHcN54EYBg763SKNDeahmW7I/R5yDkYm3n5usznLrfw9UyKEIjnH6XCJUC589dQtlf/4FTta3os1lF9nUAIL8tGLYvnee9wqNmIgEzAYCaA+3Y8Q527fo7fvaLh8btUfQnsO9nn83qtEMuSqmHrdvz7V0+SbixygnsDBM7XsHWywipSGeFqyJwpFolktNjVAvp2ltWYOjq6hE5EBPbgba2Dhzc1+RkwsOC7Cwj573xRkoIgUeDQhGK/33/C+zY8Q61sDOkJVIC9fY5RNtl2NSqz2YVLacPj5IhO8qAFEsMGmsu4cdbf4t1a1fjwe8s96mzHakZTqZeyN40BvtmIEyuEPVTenPuz692C2x67H7sq6zCwJCNrioaq+ubpGkLMpOhMygQGZgwhtV2r0slL0KloI9LzVEBYdc360B8rvGiyB+EKIrhahl6u11Hj/HURoJfvfQ2qipqkLHQgMhIFbWx6+oy48QxI42uZBkG28J05aKFbrI5Xiekk2lZcQLx8g1QnVJgd1k5Gprq8cwvt4xaw3MHiJpKivEko2hr60CHSTiLknPzREGUyK4uM6LihPYu+8B1ekMj741goccJ5/K8RXw4Eg2Cj31aVpwoRSBvIllbRLaujCaPS7fBsHfUwaEhXGyQ0z3g5xoFl2GSwrHmqO2tIzbfCzKTsWb1SrpDjVUDhwXCG8KzT7+J43VNIr9I46kOnDhmRJxe6+QV6Qr2ASF61dWeRfmeKlRV1NBzpiFNi6i4CBw/fBGPbPk3vP7mv7qNXLKQGcxruo62szJ8iTNoOd9JxaohxyAGhmxOW0wnCqJEEnSbe+jncG0wgGYbB/c1YdO9nHBOICnjqjtXYtOjhbBa+0XkIBD2l4nvzHaHDXCATvyKfOaHt8GMtdeMpIvsyqWuLjOqj474Nq66cyX1vBfI7HqH2o3gh4/9GgP917FidRbClALZqo82ICRQjq1bH5q0w9bipfOxaFEGmlta8fKLpaiqqBkmsgxL7krE++98jmeffhPP/+oHNxXl2BYyErWaW1rRYTK7VFSJkpqWFUfXVZFU/0aIrVZFoLuzR2jv6raIuk1IBsRTygmqUNII5eoOJ/0A2FoVm7K4WhxI9poZ0oR0T2qOGqlWUS/9zKw59IKfatHh2affRGtLxzDZZDSqFRRl4wff/yZ93hs548ydG4//eOUJvPr7/2JIF4wVq7Owr7wW7/7nfnpzmyzRyNZTErWutltE7y/ZqLOisACzYpXQJ2owa/ZMkfW6sLHUDmDy6W1A0DXMjFLivPEiklJiceKYUdRtQlJO0uzNCScBmUqWDhMCgFIRTlNG6R11YMCOrq4edJjMdFH7aHdWw5zZ9GxECFZzwEj3mkWqVchZkor83IWYl6pHZGQEfZ6pbgJWKELx1muVOF7XhBWrszDYNwPNxqs4UWfEurWrKRFu5nnJ9z75028jSqnH7rJyZCw0wJAmWJ3vLitHygINcvMWTPh5OpvD8fu3fiPKDtRqYT9BavJK0RlaFiwfyUCkF2ZgIAZx43Z9QYGBw+WYBpfuXSTl7Ot1eLQW51cRbrQUgCwGJGi3tNCaE7tLmiUXqVWx+6TbW3sEle+oRbR2aVlOLj0fsSqmuzrt5aEyHDp4HLvLylFQlI0wZTCMrR34ouqcSy/Gm4XV2o9NjxYCEDbtRMVFIDxKhji9Fm+/9bdJCRbK2Z1ITU7H8oKlLqMWSyC7wyac6YYFms7mcHqWY2+MAPBC8a8mnVrOilWKPvueqwPUTCgkRAaVRoHWFqNHa3F+Qzhh/ZMGV9stog+tpfkKfvlMCXQ6DZXhw+QKhITOgEqjgEqjQGSkihKLpIdkp3R7rWW43NBJyUj86pPnRSExKWbK1y5NJOV7+62/IWOhgQokJ44ZsXHzmiknG0u6B7+zHA1N9Th++CKW3JWIlOwY7CuvxV92HsGGh78yod89JESGTY8WutxcqlCE0vYqNp1vt7RQdZe9KQpRMR0pCzSTJtvg0JCoDKMIl4tqcbJgOdISMvHFvnMercX5DeF0Oh2GHIPoNotXPJJx+gXLYimh2D3S5P/ttRb02az0jkfW3pKVUqMVuz1dCCbOwa0tHcjOF7pFqo82oKAo+4bOU5OB3WHDlu+txpM//R2MpzpgSNMiY6EBez/+EN/YsHRS5FUoQkU1y9GEEnY76qzV4rOc9Mw92ZsWIRpbixscGkJIiAwBQd7xcPGrlDIwOMipqEvvaH0z0NvnoEsq2DulWhVBla9ZsUp652MldPZD9eZQ5sUG4SCfsVAgm/HUcL/mqu/CanX/jrO5c+Ox6s6V2F1WjshIFaLiInDimBEHKusnHF1JUwDbeCAVSqQ3OFfEutnPITpaSye/o+KUONd4UfTzvTGI6leEW35HHnaXlaOtrYOqTdHRWqjVStE4/auvPyF609k6nKB8jRzUfWniWaEIxV8OfASTqRMLlsXSVHLr1oeGN5a6/zVYrf3IW5GMvR8LF6ohSkjl91cdwdfuXTShCN1hMmNfZRWiE9VYfkeeUyePdPWwO8/CgcEjlzhrb27rt0OlUnq8NOB3ZQFb9zXR2InTBdNrg8yehNhUG/1ASR1O+mFID/HehtXaj8PVhxCn1yJMKUNNjVDULlr1Tx69MSQmxSBnSSqqjzYMF8SVOH/2Iprrg6FJ6B83lcvMmoM//ulJSeTq9fj7HRQYiLSsOJxrHCkNsDfr2zDX46WBAPghgmWB9MMkBU5zpxVRcUKz75c4M2YUAYDGhgtobLggIp83IQuWo672LFpbOpCUEos+ix2tLR1YlpPrcWu3a4MByM9dCGuvDX0WO6LiImDtteGS+dik3itStvDmTS1KqUd3twXhUYLHSYfJTH8HTUKvUBqwWT22Z8CvCEecsZpOt4/8AsMFzoH+ERXSbLbQ1FGKt16rxMaHnsGPt/4WP976W/zwsV/jsyMnvU66gKBraDwuKKXhUcFobxXEobwVyR5Pe+0Om1BnVKvQ3tqDMKUMinA5Go93+rQVuivMilUiTK6gf2dLA7JgOZJSYtHZ0uexPQN+GeGIvDswYKcXACkJ6HQa9FwdcOoIl4fK8Orv/wulJXuQsyQVTz+7GU8/uxlJKbH4+WN/xM43PqGFWK+kyv127P/0IO3/M3dasSAzGQn6OK+8ngiVAjHxGpg7R0otDU31XreZmwwGh4agT9TAZOpEb7sDinA56hpGbBVkITPorOJo7my39BlO6rdP2rdIRwEh3pWLFtGdWB4qQ8Xe/4eqihq88Mp3aeeEPFSG3LwFiFLqUVqyB3krkkV7xDyJtrYO9NmsiIoTRnwG+q8jNScdspAZsHtnlRltjQKAkNAZ6Db3+NW8nNSFmTWFJR6Vni4N+FWEMyi+Ark6QNTeRd40tqNA2v51bTAA+6uOYEFmMnLzFqCrqwcDA3b0mK2wWvvxjQ1LodGH4eC+Jq+kTPJQGRz2IYTJhSJ9b7sDJlMnUhZovBpR2El1lUbhj8mQSMVWaRSim8a1wQDoE4VpcOJOzQnH4DalFopwuci6mjX27G130LuY9EzSbe5BanI6jYzkPwK1WumyT9NTaprZLLzmoLDrtMSh1alGPYt6AwP91/2OcMSj0txpRWSkCt3dFnQ2h9Pr4jbMhVwdgFPNdZxwUuh0OqjVStFdSmrsSe5irNCgUIRCrYqghHI1XTDQf92l94in0HN1ACZTJwb7ZmDGoJAGRUZG+NT09ZBj0OV75wukGm0GkFjmdXdbEBR2HdZeG+yycyKlMk6vRdv5bo8olX4nmrCzTQTSbSmu9jenJqejqqIGZ85coFPchIwHKuthMnVicb7BaynclYsWqlBeDxpCSKB8TLsFT0RdKcLCg736mlwRbWDAjsaGCzhZb0Rnc7iT2jw4NITM1HSEyRVUxW463U5/P3moDEkpsbh0/qpHlEq/I1xaQiasvTZ0dY30VEZGRtAWnshIFQaGbNTCDgA9p8XptfjBI79Gxd7/h7a2DrQ0X8Fbr1XipeJSrFu72udMdLwdTdotLSJJ3dew841P8H+/sQ0/3vpbvPj8O3h46yPY+cYnItKRI4fJ1Ik+i12kVBKV25NKpV8OoJJuEzLWERIio8sbSNrgsA/RznSCl/7tMbz4fCk14SE9fhs3r8E3Niz1OtnYi3tgyAbLZQ1CEnq98lrsA9dxtd2CkNDhpYatFsyarXJ6T70V2Xa+8QlKS/aIvDsP7mtCacketFta8PgPvwW7wwa7wwatTkWbmF0plSkLBOHEE/4mfke4wvy7UFqyB2azRai1OcTj9GRC22y2OKVFISEyPPPLLSJzmhjVQlEbmLcglafJWUMWHOeVc5zdYcOVy0LTLyCUW1KT87xe+JYFy9HY0IzSkj34afFGFK/7Kio7hEaITY/GY1asEi8VlyI/dyEWLcqA3WFzUiqvtJpFvjZEA/CEv4lfFr6JyEA6Bki3CTtJ0HN1YNTvTdDHITdvARYvnQ9NQq/XyUZmt0jaQ1rUOkxmr1i6yYLlaGm+ApOpE5GRKvRZ7LD22nxiJbEsZAY+O2CERh+G/MJ0SjZydMgvTEdM4kw0Hu+kZkVSpRKA6Mgxa/ZMaPRhHump9FvCscOEbB4OOA8burp7e7vHT5QiM6/DF1qpAoKu4bMDRuh0GlGbWfK8KJ/pNGEduaQ3i7DwYJEiLVUqTaZOUU9lSIgMiYZYmEydblcq/Y5wudlLafFb2jFAzkBS409vpj8TRXS0FnH64YWJtwVDrVZ6rZXK1m/H4epD9Pxm7rQiTq9Fgj7OJ25Ss2KVaG3pQFtbB2TBciouyYLlsFh70drSgczUdFEGkZmaDmuvDYN9M6DTaejNbGDADnmoDDOjlLB1X4Oq/2NOOBZs8ZsUhVklqrfdgZDQGU57nT11mCeTzgDQ3NI64e9VKELpLjPblw7hrHHZjPPnLnn8d2hr66BTC4BQo1yWkyvyk/QWrNZ+LM6di0i1Cm/+oRx2h01w4FKEwu6w4cXnSwEAi3PnwmrtR0iIIPKQoWNiKCS9IROC/uUL9zaK+51ootPpECYXLkYiJrgsfne6t+9P6hbc1dXj5GkZEiifsPnN4NAQ8nMXoqqiBr3tDkRGqnDimFE4yD8a79GJgTf/UE5rgsZTHTCZOpG3Itln0smQEBmKX9iMHzzya2x86BnkLEkFALrU5OlnNyNCpXD6/IlSSaa/CSFZY1h3T3/7ZVkgKk6JE8eEQie5mEnxm7RFsWtmp4pg5A5P3IIvmY+h8Xgn9n96kPqlEAvx1OSVgtOX3j6h5mNbv52OxHR1mamfyP5PD07KT+Rmo9tnR05Sh2cAMJ69jAWZyZg7N96npuOjo7V49fUnUPbXf+Bco9BgnbHIgLVf/yqio7VOZGOVyshIFYxnL9Prx+4QhpY90eLll4RLS8jEiWPG4brJiNVCSKBwZiJvKGv8eSMXH7t4/uzZZmpqyjpMxem1dIE9WZjImhBNRtKPjIzAisIC7P34QxjStDCkaXHimBF/2XnE7QZChPRvv/U3xOm11C3M2isYC/niWE50tBZP/vTb9LUFBQaOumiSdJRUH22gA7VCi5cwHSJt8XKXT6VfEg7AyJopphArLX5Lvz4ZNDZcwGcHjCKXKbKxZllOLlI2iZeCsBbrZPSHJd5EzyeF+Xdh78cfUtesBZnJ2F1WjsX5BsxPN7iNdApFKH710tvU5RkYcQvztegmfc8IxspoiJJt7a2hj7FLGskZ+sPdx9zqU+mXhCPF76bT7UhMisHAgB0RKoWw1bLVTIvf5OuTRWdzOJ4v/hUGhmxINMRiRWEBFucbMGv2TJHLM1s8lYfKIA+S0S077GKKbc9+Cwn6iRWwE9Id1DUrKk5YLaUwyvHi8+/gP/+0zS2dHsTlmdidhymDPe4WdiMZCEsm8ntIb3DEXDZYFiiqI5IWL2KMRJTMD+HenXF+G+EAiAZNSa2FDExKvz4ZaBJ6qdhBPkRCLGJIxPoukjVWbDQkrs3L78hDdLR2wqkl6fs8XH0IjTWXkJQSiyWF83C08jR+8eSreOaXW6aUdIRsxOacNZ71pFvYRIQpQiZCIrPZQu3riepIHLcH+q+LNvCwRAMAw5zZVDgB4DHhxC8JN9qeATZlUITLb6oWR8QYq7WffvDSZYzSDTskGkrXRt3IMoyf/GwjtnzzZahVEUhYMBNLCudhX3ktfvjYr/HUj3+JhPTAm0rzSIR467VKlJbswe0Fc5GQNhN9FjuqKmpRUJTtNpfnsV4Pa6HHbtoZz74eEIrhxG175FyscnquMKVw9OjutlAXL1JeiE/RuVU48dsIJ1cHiGpt7Lh8b7tjSrrcpQvrWTUyUq1CxiIDlhfcD32iBvqEWU4Eu9GL1dZvx9y58di4eQ12l5VjZpSwSqqgKBvVRxvw+LYf4Tvfvh9fu3fRpF2JiRh0st6IP731Pzhe14RFK5Io2faV12JBZjL+9YkNbiUb60/JbtpxtWyF2NizhCL29QTEup6FudMKc6eV7vVzOjq09NFIanfYEKESLPLbWy1uE078knCGpPmIVKvoIKqr4iaptdyMuvbkv/4ex+uaRHvLpGrkVBBstNSSXbBBttoU/p8FqDlgxI4d72B/1RF8a9M/IyU13slc1VVaNjg0hMaGC3h/r7CMUREup2uwWLI988stUzppziq+9oHrE9oRxy5bGeybgaCw67TFzNxphfHsZboFl4AQk+yWUKuEntSZKc5tYMSFm033gwID3S6c+G2EG832nBQ3AaEWdzNnneUFS7G8YCnSEpchNtXmMcdglnQbHv4KJd2MwUAkLJiJ7HwDktpjcaq2FT/e+lvodBrqcKzVqUS7wqUXN7mBEAIDcNo5B+CmJxTY3dznz11C0+l20SZZdnkKSy4AlFinaltF+yBY6/qklFhKGnbjLfndWbdt6TnePnCd1lTZz9ATwonfEs6V7bl0ENV49rLo65MFUbCs1l7YvKSK2/rt2PRoIWbFKrFjxzs4b5RjSeE8uq20t11wFt7/6UHsLusUXZgklWKXTJKli4CwRej44YswmTqxbu3qCW/IGS9FvNggxyXzMRw4dMxpKw7ZwbcgLFaUCrI7CMhrZfdB6BM1dIW0dLPqWFtvR4OrZgQ2S3KXcOLXKqXU9nyig6iTiTC+AKu1H1+7dxH0iRr86a3/wb7yWsTptUjJjkF4lAzZUYZhAsWKzjIzBgNxPUhJl0wS9LY7KBF0Og1eff2JG6q1kQvfPnAdjQ3NVKmVrmom+9BFO/gY4YOQa7kyT7Tkw9UeAkIMdhp+tNqbK3NfNtq5Om4Q4cRdozp+Szh2EDUlNJ7WwiYyiOqPsFr7oU+Yhed/9QPs+6gae8o/xL7yWlHUCI+SAUogPMo5opO95GRlcpxeS/eDy4LlEyYbmyp+duSkKIqx+/UIwQm5B2pH0kiy5JJsMmLJxXaKEGK5IlSESuFEHnYFteWyhk5wk5sycUZjodWpRDft2zAXs2arcOWy2S3CSZC/X4jsIKpCESqqxZExjNw8TBvYHTYUrfon5Bemo672LA4cOoYTXxhx4phRJJGLZPBhcUGn04j2kpPIP955jZCBNGiT5yT1RsOc2UjJjqHii8loQfXRi6JdfOwZU7pJFgB6zFanaCULljtFuYEBO65cvupUg7vabsGVy2bBsJaJnqQjaTLqN4m67hBO/JZwpBYnHTRla3GupODpAHKRLlqUQV2kWVldCnIGIqWLiSybdBXJpCTLiBwplDfWXHTahU4U3QR9HGQhM0RRSEow1kmNLW6T34lsSSXPISWSXB0AnU4j7JiQK5CzJNWl7eGsWOWYw8kED35nORdNXN2NSHHblXW1rwyiujPakcO/PmEW5qcbxj2Pjpc6kuL++XOXUPbXfziRLDdtrvgcWDHSxL3qzpWioj/bwC0VKSIjI+jrYcnFNoezpJKrAxCpViFMrsCqO1fSYwV78xXWUut8+jPzW8LdptQiUq0atT1H8AZR4lRtq18toLjZc96NKoxk7/bBfU04XH2InskSDbHIvWeEZDUHjFR11Ok0WLd2NRbnG2j0JGcw6Wtha5bSFcTnjRdpERoANPowZCw0IC0hU0QqfyDUtCWcTqdzqsWRswhbixtyDPrVAgqPZQfDKWNzfTBOnT+M/VVHcOWyoG5GxSnpmUxKsgWZyVizeiWS50XRxnBXdUk2Je1sDkfd8OwgITOd9hhOBTduXonC/LumDbGmZUpJanHsICq715kdNIyeY/cp23BvgaSMpOOE7EQn0jwr3wstTp00kuWtSKbnMVcmTNJi98F9Tdj/6UGYTJ2UYDGJM7Fu7WrMilUiLXEZivLvnbbkmpYqpa37Gr7EGcSGxo86F/clziAgKH7MQijpp5vO0ezMmQtOKaNhzmwY0rS0bFB9dKRssPyOPJousoqmxWqn3RxEDGGL3dVHG2iKKFcHIGOhAYV5ebckwaYV4fJWJKO0RFxru5Fa3MCAHY9s+TesX383ilb907RJQUk0IyojiWYZCw20GM2mjIpwOXKWpCI/dyEys+bQ7yeqIqsokm7+ptPt2F91BMfrmmgUi0/RiVJEd82WccJ5GDJ7knAxMKav0rm4idTirly+iguNJuyvOkLbufw5mgGgKd2+yio6rU6iGSD0T56qHUkZt259SHDDioyg6mJXVw8lGXn8YoOcnvkIydgotmXt45xg05VwZCMqu4JYoQhFlFKPMLlgUTdeLU6hCEXL+U7I1QE4XteEk/VGt1oZuOXGM5zakWj21/f/QQvhGQsNonrZ0Y/OC47KahWdZCcKo9XaL/q9STcHW/CuqqihkWzRiiT8y4af8Ch2qxCO3YgqNYUVGmEToVYrcaq5DoNDXxn15+yvOoI4vRYD/dfxfPHbKH5hM/W6GM2UxreiWatIoNDpNLRJmZzNqiqMVGVcv/5uGs1c1efYVPRwTTWOVp5GZ0sfjWScZLco4YgpbFeXWbRGlq3FqTQKmDutoypqb71Wic+rztAtLNuf+RO2fPNlrFy3EPm5C2krkq8JIIQQ5XuqcLyuiRocEaVRGs2IyshK+a5IRmpx+z89iAuNJnom+2nx/T6dLhrPnURMUC1k+gc44dwFYgprPHuZPuaqFufKo7Kx4QL+d/9+7Cuvxcp1C6n347Znv4WD+5qwu6wcH+4+hvgUHf7zT9u8HuVI5wZxE2PPZmNFs+99f7Wob5JtCGbJe+jgcUpeW/c1xCTOxMbNa1CYf5dbjVGnCjFBteipKIZ2CyecWzHRWhzxqJQFy3H2bDMe3fAbAMCcrCjcu6qAlgWio7Vot/wDAHB7wVysXlPgVZIBQHN9MA4wQoWrXkYSzdiaGUmLpTUzcjY7WW/EZweMNJrJ1QEoKMrG+lXf9Zp8b2/5s3AuvYFIFRydA+O5kz6d6vo94YCRWpwGs+hjYeHBMHdaqeknERfsDhtmzRbu3l1DzThaeRqPbvgNNm5eg02PFuJff/wKjtc14elnN2Px0vnD6Zfnops06rByPjtAKhSnR6JZQVE2vpcrjmau2qvYMgERQEg027a12OsXa1/9B5MmnL3lz+ir/wBh6fcA9c/BiKd8lnR+Tzi2FsfOxSWlCBYE7F7nuXPjYXcIjc7EL+TMXRfw5h/KUVqyBwBwvK4JW7c+RLvwPUkydpDTVXEaEOR8tjjt6mzmKm1srg/GXw58hMPVh3C2tl2kMvpSMdrRVj0povVUFCM4OkcgG4Cw9HvgqFgN8+kcqFbt4oSbarC1ONajMkqpR7Wtgf476UgGIVN0tBbP/HILnn36TewuK0ecXov8wnS3k42NZORcJiWZq37G0YrTUlGIKJC+HM1cCR8K5s/jvb5Lg1lAYTnUp5+jEa6v/gNEFBXj0mAWVDzCuQ9SQs2KVYrMZ8Ya01EoQrF6TQE+rzqDpKJYt+2xZjvmpSQjKiM7yNne2kPradKzGSlOszcGYpxzsUGOA+cPY0/5hzSaxafosH3Hdp9urYoJqkVfdA79MzA24Sghk3bBvHc9+uo/QPe8p6DSz4eBn+HcA3ZBI8Hg0BAiZobQv7OL1F3Bau3HvFQ95mRFITM1fcosGaTGOgfOHxbNe7ny/DAZrdQThJXzyYyZtDhNiGwfuI6zZ5upBR7pAPEnpbGnohgRRcX0z5NRHMPS70FPRTEMq3y7Nuj3hGPn4gihrg0G0H1xpBY33r64kBAZ/uOVJybl7+GKXITwpJlXaiDrypKgvXWkaZhMS7vqZ3Q1/iJVMG3d1xCfosP6rXf7VZtV3+c/c3lGm6h4cmkwC1GZa33+9/R7wrFzcYRQdocNt2GuqBbX3W0RlQ5GPYhP0N+DjaasczBZ4MESTDCRFZYGEhm/vXXE0Icl2bxUPSJUCmr9NprSyI7XkC6QdWtX+000Y89t6tPPwdFWTaMbAEQUFQ8LIkKaON6Nw5A0H0h6kRPOE3DlUalJ6BUt4DtxzAjl7E4UauPwef/Et8GwPhxtbR1w2IdgNluo3/2p2lYMOQZFzsGGObMBKBEVFyGKYuZOq8iSQBrJWK8RtlDPNiQ3nW53Optt3LzSayKI8dxJ8Xlqgt8TE1SLvvoPoGirhmOYYFIQ0inaVqOvay2CojJwaTDLr1vKpo1oQjwqieDBjulExQn+GX8s2YPPmGXr44kv7AKJvl4HAoODqFmpTqcBIExHA0B2XAItQRDBo7HmkshlmNjDsTNmAFzWzIikb+u3OymN7NnM2yJITFAtBttPTCq6KCpXo2f4z6yk7woRRcXoq/8AX9aVASgTVMyks5xw3gTrUelqfdVg3wzE6bWoPtrg5PDr8oIYtpojHvUqjQJqlfDzFoQJZqskNSSe9+2tPTRFBIBItQox8Rqk5qQjZYGGpoqkFECI5ipdZXsa91VW4dL5qzSa+drZjBSqwybxPdbCckrWnopi9EjSSZpdtJ8YJhqo1A+QnbeccN5XuZi5OGDEMi8o7DqSUmLp42mIc3IiZsGSiZwBu7rM6Ooyw9xoRXe3RbRIgqSRxBpOn6ihyxtZezhXog0b5dhSAUkZfbmn0XjuJNTMnyd6Exj5d/Oh3fIALWDflimkjSzZIoqKqXBimAbX6LQgnCuPSqu1HykLNEAZqH++WGzRiGbl2H1jzsLMyLok6SIJKbnYc58rezgpyT47cpKa64jPZb6RMo51BlOf/mAkHax/Dvage27ojCXTP4CIIlIWEAgnJdt0wbSJcHJ1gNPcW2bWHLz6+hP0702n28c1ASW+lsnzotBhMjttZXGlUo5FLinB2to66CaZE18YRemiL5OMhfr0c+hpq8ZtjAwv0+rRU1EMdXQOkDT5liqZ/gEER38gnAeHz3bTjWzThnCkFudq7o30GAYFBtLu+Ymqk4lJMU6bWcbrQGGNdQjBiAfjqeY6nDhmFDlY+QvJWKhW7YLx3EkEn36OPmbvaIG1sPymzpakNYv8eTpiWhBOp9MhOlEN49nLTnNvYy2EuFFId0+TFHY8B2EyMU0MTv3ZwcqQNB9GPAX1MOkmUisbD5cGs6BoE8STS/OemhZntmmbUqYlZOLEMSOuXL7qZPlNalwTekPGaOsi6mLbWRld6k7qca7suaUOwtPNlsCQNB/m01Ih5OZ+Xkfl1P08Tjg3gpQGnt72OhINsZgZpaTLHMi5jPRXSlcUEQTLAtFhMgMA3cwCCPU4snOt7Xw3urrNTsskNPowYUvM2jxqz30reDBOdeoXPNy8PF0xY2ho6Pp0+WU2PXa/k9PvVIoyinA5wuQKwTskIZO6B093e25P4kY6VzjhvAyTyYQvLR04VHNE9Pip84cnpFKmJS4TPeZP21k4OOE4ODiGEcDfAg4OTjgODk44Dg4OTjgODk44Dg4OTjgODk44Dg5OOA4ODk44Dg5OOA4ODk44Dg5OOA4OTjgODg5OOA4OTjgODg5OOA4OTjgODg5OOA4OTjgODk44Dg4OTjgODk44Dg4OTjgODk44Dg5OOA4ODk44Dg5OOA4ODk44Dg5OOA4ODk44Dg5OOA4OTjgODg5OOA4OTjgODg5OOA4OTjgODk44Dg4OTjgOjmmA/w+96dntrwjP7gAAAABJRU5ErkJggg==";

const C = {
  bgDeep: "#FFFFFF", bg: "#F4F7F3", card: "#FFFFFF", cardLine: "#E7ECE6",
  green: "#0E9E68", greenBright: "#16C285", mint: "#0B7F52", mintFill: "#7DE0B2",
  paper: "#0A2F22", slate: "#6B7B73", textHi: "#0A2F22", textLo: "#7C8B83",
  yellow: "#F5E663", yellowSoft: "#FBF6C9",
};
const D = { bg: "#0A2F22", bgDeep: "#06160F", card: "#0E3A2B", cardLine: "#1C4A38", green: "#16C285", mint: "#7DE0B2", paper: "#F2F5EE", slate: "#48524D", textLo: "#8FA89B" };

const FONT = "'Satoshi','Inter Tight',system-ui,sans-serif";

const ASSETS = {
  USDT: { sym: "USDT", color: "#26A17B", glyph: "₮" },
  USDC: { sym: "USDC", color: "#2775CA", glyph: "$" },
};

// ---- 6 currencies, each with a city + regionally-styled merchants ----
// Names are inspired-by, intentionally altered from real P2P handles.
const CURRENCIES = {
  AED: { code: "AED", symbol: "د.إ", city: "Dubai", rate: 3.67, flag: "🇦🇪" },
  CNY: { code: "CNY", symbol: "¥", city: "Shenzhen", rate: 7.24, flag: "🇨🇳" },
  VES: { code: "VES", symbol: "Bs", city: "Caracas", rate: 740, flag: "🇻🇪" },
  NGN: { code: "NGN", symbol: "₦", city: "Lagos", rate: 1580, flag: "🇳🇬" },
  VND: { code: "VND", symbol: "₫", city: "Hanoi", rate: 25400, flag: "🇻🇳" },
  INR: { code: "INR", symbol: "₹", city: "Mumbai", rate: 102, flag: "🇮🇳" },
};

// regional merchant pools (10 each). x/y are normalized positions on the city map.
const POOLS = {
  AED: [
    ["RAHEEM-OTC","R","gold"],["MinaDirham","M","silver"],["iddySwap","I","silver"],
    ["NajmTrader","N","gold"],["DubaiCashHub","D","gold"],["AishaLiquidity","A","silver"],
    ["SharafX","S","gold"],["Khalid_Desk","K","silver"],["RoyalDirham","R","gold"],["FatimaFX","F","silver"],
  ],
  CNY: [
    ["二狗商行-极速","二","gold"],["启航优选","启","gold"],["阿拉神灯","阿","silver"],
    ["古天乐安全","古","gold"],["要快乐-沉淀","要","silver"],["老朱实名收付","老","gold"],
    ["钱多多支付","钱","silver"],["稳健通道","稳","gold"],["金牌神盾","金","silver"],["顺丰兑换","顺","gold"],
  ],
  VES: [
    ["FAST-Caracas","F","gold"],["Lmg_traders","L","silver"],["ComercioSeguro","C","gold"],
    ["MaximoPagos","M","silver"],["PagoYa","P","gold"],["EduCambios","E","silver"],
    ["SiSiPay","S","silver"],["BolivarPro","B","gold"],["RapidoVES","R","silver"],["CaracasDesk","C","gold"],
  ],
  NGN: [
    ["NairaKing","N","gold"],["ChiomaPays","C","silver"],["LagosLiquidity","L","gold"],
    ["TundeOTC","T","silver"],["NaijaSwift","N","gold"],["AbujaDesk","A","silver"],
    ["KemiExchange","K","gold"],["FastNaira","F","silver"],["EkoCashHub","E","gold"],["YemiTrades","Y","silver"],
  ],
  VND: [
    ["HanoiFast","H","gold"],["MinhLiquidity","M","silver"],["DongPro","D","gold"],
    ["SaigonDesk","S","silver"],["VietSwift","V","gold"],["LinhExchange","L","silver"],
    ["TuanOTC","T","gold"],["RapidDong","R","silver"],["HaiPhongHub","H","gold"],["AnhTrades","A","silver"],
  ],
  INR: [
    ["CoinLoom","C","gold"],["ZentroPay","Z","silver"],["LedgerTower","L","gold"],
    ["RapidPay","R","silver"],["SmallShark","S","gold"],["RaviTakaTak","R","silver"],
    ["TraderOnDuty","T","silver"],["DipakDesk","D","gold"],["MumbaiSwift","M","gold"],["KiranFX","K","silver"],
  ],
};

const POS = [
  [0.46,0.50],[0.62,0.30],[0.30,0.44],[0.22,0.62],[0.50,0.42],
  [0.16,0.54],[0.55,0.36],[0.38,0.38],[0.52,0.48],[0.34,0.58],
];

function buildMerchants(cur) {
  const base = CURRENCIES[cur].rate;
  return POOLS[cur].map((m, i) => {
    const jitter = 1 + ((i % 5) - 2) * 0.003; // small rate spread
    const rate = +(base * jitter).toFixed(base < 10 ? 3 : base < 1000 ? 2 : 0);
    const trades = [1422,25,93,660,3104,211,884,47,1520,132][i];
    const completion = [100,100,92.1,100,99.8,99.1,100,97.8,99.9,98.5][i];
    const likes = [99.9,100,95.1,99.2,98.4,97.2,99,96.3,98.9,97.8][i];
    return {
      id: cur + i, name: m[0], initial: m[1], tier: m[2],
      trades, completion, likes,
      rates: { USDT: rate, USDC: +(rate * 1.0008).toFixed(base < 10 ? 3 : 0) },
      min: Math.round(base * 100), max: Math.round(base * 6000),
      liq: { USDT: [8714,15907,508,22140,61200,9420,33010,4200,28800,6750][i], USDC: [5210,9100,1200,14000,40300,6100,21000,2800,19500,4300][i] },
      zone: CURRENCIES[cur].city, eta: [10,15,20,12,8,14,11,18,9,16][i], hours: i % 3 === 0 ? "24h" : "9am–11pm",
      x: POS[i][0], y: POS[i][1],
    };
  });
}

const fmt = (n, d = 2) => n.toLocaleString("en-US", { maximumFractionDigits: d, minimumFractionDigits: d === 0 ? 0 : undefined });
const assetText = (a) => (a === "USDC" ? C.mint : C.green);

// ============================================================
//  ROOT
// ============================================================
export default function Cashta() {
  const [screen, setScreen] = useState("login");
  const [role, setRole] = useState(null);
  const [side, setSide] = useState("buy");
  const [asset, setAsset] = useState("USDT");
  const [cur, setCur] = useState("AED");
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState(null);
  const [mobile, setMobile] = useState(false);

  // detect real phone vs desktop. SSR-safe: starts framed, updates on mount.
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const merchants = buildMerchants(cur);

  const screens = (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      {screen === "login" && <Login onNext={() => setScreen("role")} />}
      {screen === "role" && <RoleSelect onUser={() => { setRole("user"); setScreen("market"); }} onMerchant={() => { setRole("merchant"); setScreen("merchantDash"); }} />}
      {screen === "market" && <MarketView merchants={merchants} side={side} setSide={setSide} asset={asset} setAsset={setAsset} cur={cur} setCur={setCur} onPick={(m) => { setSelected(m); setAmount(m.min); setScreen("merchant"); }} onBack={() => setScreen("role")} />}
      {screen === "merchant" && selected && <MerchantDetail m={selected} side={side} asset={asset} cur={cur} amount={amount ?? selected.min} setAmount={setAmount} onBack={() => setScreen("market")} onStart={() => setScreen("handshake")} />}
      {screen === "handshake" && selected && <Handshake m={selected} side={side} asset={asset} cur={cur} amount={amount ?? selected.min} onDone={() => setScreen("market")} onCancel={() => setScreen("merchant")} />}
      {screen === "merchantDash" && <MerchantDash cur={cur} onBack={() => setScreen("role")} />}
    </div>
  );

  // PHONE: full-screen, no frame
  if (mobile) {
    return (
      <div style={{ position: "fixed", inset: 0, background: C.bgDeep, fontFamily: FONT, overflow: "hidden" }}>
        <FontLoader />
        {screens}
      </div>
    );
  }

  // DESKTOP: centered phone mockup on a soft backdrop (for demos / investor review)
  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 30%, #E9F0EA, #D2DAD1)", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: FONT, padding: 24 }}>
      <FontLoader />
      <div style={{ width: 393, height: 820, background: C.bgDeep, borderRadius: 46, position: "relative", overflow: "hidden", boxShadow: "0 40px 120px -20px rgba(20,40,30,.45), 0 0 0 10px #0c0c0e, 0 0 0 12px #2a2a2e" }}>
        {screens}
        <div style={{ position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", width: 128, height: 5, borderRadius: 3, background: C.paper, opacity: 0.25, zIndex: 60 }} />
      </div>
    </div>
  );
}

function FontLoader() {
  useEffect(() => {
    const f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap";
    document.head.appendChild(f);
  }, []);
  return null;
}

function Logo({ size = 64 }) {
  return <img src={LOGO} alt="Cashta" width={size} height={size} style={{ objectFit: "contain", display: "block" }} />;
}

// ============================================================
//  LOGIN
// ============================================================
function Login({ onNext }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 28px", position: "relative", overflow: "hidden", background: "#FFFFFF" }}>
      {/* very subtle single tint, barely there */}
      <div style={{ position: "absolute", top: -140, right: -140, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${C.mintFill}22, transparent 70%)` }} />

      {/* centered hero */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", textAlign: "center" }}>
        {/* logo — bare, large */}
        <Logo size={168} />
        <h1 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 56, lineHeight: 0.95, letterSpacing: "-.045em", color: C.paper, margin: "26px 0 0" }}>Cashta</h1>
        <p style={{ fontWeight: 600, fontSize: 12.5, color: C.green, margin: "12px 0 0", letterSpacing: "0.28em", textTransform: "uppercase" }}>Trusted Value Movement</p>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: C.textLo, margin: "18px 0 0", maxWidth: 290 }}>Swap physical cash and stablecoins through verified local merchants — escrow-protected, reputation-scored.</p>
      </div>

      <div style={{ paddingBottom: 46, position: "relative" }}>
        <AuthButton onClick={onNext} variant="google" />
        <div style={{ height: 12 }} />
        <AuthButton onClick={onNext} variant="privy" />
      </div>
    </div>
  );
}
function AuthButton({ onClick, variant }) {
  const google = variant === "google";
  return (
    <button onClick={onClick} style={{ width: "100%", height: 56, borderRadius: 16, border: google ? `1.5px solid ${C.cardLine}` : "none", background: google ? "#fff" : C.green, color: google ? C.textHi : "#fff", boxShadow: google ? "0 1px 2px rgba(20,40,30,.05)" : `0 12px 30px -10px ${C.green}88`, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: FONT, fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "transform .12s" }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(.98)"} onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
      {google
        ? <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z"/></svg>
        : <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeOpacity="0.7"/><path d="M9 8h4.2a3 3 0 0 1 0 6H11v2.5H9V8zm2 1.8v2.4h2a1.2 1.2 0 0 0 0-2.4h-2z" fill="#fff"/></svg>}
      {google ? "Continue with Google" : "Continue with Privy"}
    </button>
  );
}

// ============================================================
//  ROLE SELECT
// ============================================================
function RoleSelect({ onUser, onMerchant }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "44px 28px 46px" }}>
      <div><Logo size={76} />
        <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 32, letterSpacing: "-.035em", color: C.paper, margin: "18px 0 6px", lineHeight: 1.02 }}>How will you<br/>use Cashta?</h2>
        <p style={{ fontSize: 14.5, color: C.textLo, margin: 0 }}>Switch roles anytime in settings.</p>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
        <RoleCard onClick={onUser} accent={C.green} title="I'm a User" desc="Find nearby merchants and swap cash ⇄ stablecoins, escrow-protected." emoji="👤" chips={["Buy & sell USDT / USDC","Cash pickup near me"]}/>
        <RoleCard onClick={onMerchant} accent={C.mint} title="Become a Merchant" desc="Provide liquidity, set your spread, earn on every verified swap." emoji="🏪" chips={["Set your own rate","Stake to earn trust"]}/>
      </div>
    </div>
  );
}
function RoleCard({ onClick, title, desc, emoji, chips, accent }) {
  return (
    <button onClick={onClick} style={{ textAlign: "left", border: `1.5px solid ${C.cardLine}`, background: C.card, borderRadius: 24, padding: 22, cursor: "pointer", transition: "transform .14s, box-shadow .14s, border-color .14s", boxShadow: "0 4px 16px -8px rgba(20,40,30,.12)" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 18px 44px -16px ${accent}66`; e.currentTarget.style.borderColor = accent; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px -8px rgba(20,40,30,.12)"; e.currentTarget.style.borderColor = C.cardLine; }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(.985)"} onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}>
      <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 12 }}>
        <div style={{ width: 54, height: 54, borderRadius: 17, background: `linear-gradient(145deg, ${accent}22, ${accent}10)`, border: `1px solid ${accent}26`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, boxShadow: `inset 0 1px 2px rgba(255,255,255,.7), 0 6px 14px -8px ${accent}80`, lineHeight: 1 }}>{emoji}</div>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 21, color: C.paper, letterSpacing: "-.02em" }}>{title}</span>
        <span style={{ marginLeft: "auto", color: accent, fontSize: 22 }}>→</span>
      </div>
      <p style={{ fontSize: 14, color: C.textLo, margin: "0 0 14px", lineHeight: 1.45 }}>{desc}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{chips.map((c) => <span key={c} style={{ fontSize: 11.5, fontWeight: 600, color: accent, background: `${accent}18`, padding: "5px 10px", borderRadius: 8 }}>{c}</span>)}</div>
    </button>
  );
}

// ============================================================
//  MARKET VIEW — currency switcher + full-screen map / list
// ============================================================
function MarketView({ merchants, side, setSide, asset, setAsset, cur, setCur, onPick, onBack }) {
  const [tab, setTab] = useState("map");
  const [hover, setHover] = useState(null);
  const [curOpen, setCurOpen] = useState(false);
  const CUR = CURRENCIES[cur];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bgDeep, position: "relative" }}>
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onBack} style={iconBtn}>‹</button>
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 22, color: C.paper, letterSpacing: "-.03em", lineHeight: 1 }}>{CUR.flag} {CUR.city}</div>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 600, marginTop: 3 }}>● 10 verified merchants online</div>
          </div>
          <button onClick={() => setCurOpen(v => !v)} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, border: `1.5px solid ${C.cardLine}`, borderRadius: 12, padding: "8px 12px", background: C.card, fontWeight: 700, fontSize: 14, color: C.paper, cursor: "pointer" }}>
            <span style={{ color: C.green }}>{CUR.symbol}</span> {cur} <span style={{ color: C.slate, fontSize: 11 }}>▾</span>
          </button>
        </div>

        {curOpen && (
          <div style={{ position: "absolute", right: 20, top: 58, zIndex: 80, background: "#fff", border: `1.5px solid ${C.cardLine}`, borderRadius: 16, boxShadow: "0 20px 50px -16px rgba(20,40,30,.3)", overflow: "hidden", width: 180 }}>
            {Object.values(CURRENCIES).map((x) => (
              <button key={x.code} onClick={() => { setCur(x.code); setCurOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "none", borderBottom: `1px solid ${C.cardLine}`, background: cur === x.code ? `${C.green}12` : "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, color: C.paper }}>
                <span style={{ fontSize: 18 }}>{x.flag}</span>
                <span>{x.code}</span>
                <span style={{ marginLeft: "auto", color: C.textLo, fontWeight: 500 }}>{x.city}</span>
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
          <div style={{ display: "flex", background: C.bg, borderRadius: 12, padding: 3, border: `1px solid ${C.cardLine}` }}>
            {["buy","sell"].map((s) => (
              <button key={s} onClick={() => setSide(s)} style={{ border: "none", borderRadius: 10, padding: "8px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer", textTransform: "capitalize", transition: "all .15s", background: side === s ? (s === "buy" ? C.green : C.paper) : "transparent", color: side === s ? "#fff" : C.textLo }}>{s}</button>
            ))}
          </div>
          <div style={{ display: "flex", background: C.bg, borderRadius: 12, padding: 3, border: `1px solid ${C.cardLine}` }}>
            {Object.keys(ASSETS).map((a) => (
              <button key={a} onClick={() => setAsset(a)} style={{ border: "none", borderRadius: 10, padding: "8px 11px", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all .15s", background: asset === a ? ASSETS[a].color : "transparent", color: asset === a ? "#fff" : C.textLo }}>
                <Coin sym={a} on={asset === a}/>{a}
              </button>
            ))}
          </div>
          <button onClick={() => setTab(tab === "map" ? "list" : "map")} style={{ marginLeft: "auto", ...iconBtn, fontSize: 15 }}>{tab === "map" ? "≣" : "◎"}</button>
        </div>

        <div style={{ marginTop: 12, fontSize: 12.5, color: C.textLo }}>
          {side === "buy"
            ? <>You pay <b style={{ color: C.mint }}>cash ({cur})</b> → receive <b style={{ color: assetText(asset) }}>{asset}</b></>
            : <>You give <b style={{ color: assetText(asset) }}>{asset}</b> → receive <b style={{ color: C.mint }}>cash ({cur})</b></>}
        </div>
      </div>

      {tab === "map"
        ? <CityMap merchants={merchants} cur={cur} hover={hover} setHover={setHover} onPick={onPick} asset={asset}/>
        : <Listings merchants={merchants} onPick={onPick} side={side} asset={asset} cur={cur}/>}

      <TabBar active="market"/>
    </div>
  );
}

function Coin({ sym, on }) {
  const col = ASSETS[sym].color;
  return <span style={{ width: 16, height: 16, borderRadius: "50%", background: on ? "#fff" : col, color: on ? col : "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900 }}>{ASSETS[sym].glyph}</span>;
}

// ============================================================
//  FULL-SCREEN CITY MAP
// ============================================================
function CityMap({ merchants, cur, hover, setHover, onPick, asset }) {
  const [sel, setSel] = useState(null);
  const active = sel || hover;
  const am = merchants.find(m => m.id === active);

  return (
    <div style={{ flex: 1, position: "relative", margin: "14px 0 0", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 393 560" preserveAspectRatio="xMidYMid slice" style={{ display: "block", position: "absolute", inset: 0, background: "linear-gradient(165deg,#EEF4ED,#E3ECE4)" }}>
        {/* water bodies */}
        <path d="M0 0 L393 0 L393 110 Q250 140 200 230 Q165 290 70 340 Q25 365 0 410 Z" fill="#CFE3E6" opacity="0.7"/>
        <path d="M0 0 L393 0 L393 85 Q260 115 215 215 Q175 285 80 335 Q30 362 0 395 Z" fill="#C2DCE0" opacity="0.55"/>
        {/* major diagonal highway */}
        <path d="M30 540 Q180 320 380 90" stroke="#fff" strokeWidth="11" fill="none" strokeLinecap="round"/>
        <path d="M30 540 Q180 320 380 90" stroke={C.green} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="2 9" opacity="0.55"/>
        {/* secondary roads */}
        <path d="M10 380 Q160 350 383 380" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9"/>
        <path d="M120 70 Q150 320 130 545" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85"/>
        <path d="M260 80 Q280 300 300 540" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M10 230 Q200 250 383 210" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7"/>
        {/* parks / blocks */}
        <circle cx="300" cy="430" r="40" fill="#9FCFA8" opacity="0.3"/>
        <rect x="60" y="150" width="70" height="55" rx="12" fill="#9FCFA8" opacity="0.25"/>
        <rect x="200" y="380" width="60" height="50" rx="10" fill="#9FCFA8" opacity="0.22"/>
        <text x="300" y="55" fontFamily={FONT} fontSize="10" fill="#7FA0A4" fontWeight="600">WATERFRONT</text>
        <text x="150" y="250" fontFamily={FONT} fontSize="9" fill="#A8B6A0" fontWeight="700" transform="rotate(-34 150 250)" opacity="0.9">MAIN ROAD</text>
      </svg>

      {/* pins */}
      {merchants.map((m, i) => {
        const left = m.x * 393, top = m.y * 560, isAct = active === m.id, isGold = m.tier === "gold";
        return (
          <button key={m.id} onClick={() => setSel(m.id)} onMouseEnter={() => setHover(m.id)} onMouseLeave={() => setHover(null)}
            style={{ position: "absolute", left, top, transform: "translate(-50%,-100%)", border: "none", background: "transparent", cursor: "pointer", zIndex: isAct ? 30 : 10, animation: "drop .5s cubic-bezier(.2,.9,.3,1.3) both", animationDelay: `${i * 45}ms` }}>
            <div style={{ width: isAct ? 44 : 36, height: isAct ? 44 : 36, borderRadius: "50% 50% 50% 2px", transform: "rotate(45deg)", background: isGold ? C.green : "#fff", border: `2.5px solid ${isGold ? C.greenBright : C.green}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .16s", boxShadow: isAct ? `0 12px 26px -6px ${C.green}cc` : "0 4px 12px rgba(20,40,30,.25)" }}>
              <span style={{ transform: "rotate(-45deg)", color: isGold ? "#fff" : C.green, fontWeight: 900, fontSize: isAct ? 15 : 13, fontFamily: FONT }}>{m.initial}</span>
            </div>
          </button>
        );
      })}

      {/* you-are-here */}
      <div style={{ position: "absolute", left: "44%", top: "72%", transform: "translate(-50%,-50%)", zIndex: 5 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#2E7DF6", border: "3px solid #fff", boxShadow: "0 0 0 6px rgba(46,125,246,.2), 0 2px 6px rgba(0,0,0,.2)" }}/>
      </div>

      {/* floating merchant card */}
      {am && (
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 40, background: "#fff", borderRadius: 22, padding: 16, boxShadow: "0 24px 60px -16px rgba(20,40,30,.4)", border: `1.5px solid ${C.cardLine}`, animation: "rise .25s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar m={am} big/>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: C.paper }}>{am.name}</span>
                {am.tier === "gold" && <GoldBadge/>}
              </div>
              <div style={{ fontSize: 11.5, color: C.textLo, marginTop: 3 }}>{am.trades} trades · <span style={{ color: C.green, fontWeight: 600 }}>{am.completion}%</span> · ≤{am.eta} min</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 20, color: C.paper, letterSpacing: "-.02em" }}>{am.rates[asset]}</div>
              <div style={{ fontSize: 10.5, color: C.textLo }}>{CURRENCIES[cur].symbol}/{asset}</div>
            </div>
          </div>
          <button onClick={() => onPick(am)} style={{ width: "100%", marginTop: 14, height: 48, borderRadius: 14, border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: FONT, cursor: "pointer", boxShadow: `0 10px 24px -10px ${C.green}` }}>View swap →</button>
        </div>
      )}

      <style>{`@keyframes drop{0%{opacity:0;transform:translate(-50%,-160%)}100%{opacity:1;transform:translate(-50%,-100%)}}@keyframes rise{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

// ---- list view ----
function Listings({ merchants, onPick, side, asset, cur }) {
  const sym = CURRENCIES[cur].symbol;
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "8px 0 90px" }}>
      {merchants.map((m) => (
        <button key={m.id} onClick={() => onPick(m)} style={{ width: "100%", textAlign: "left", border: "none", borderBottom: `1px solid ${C.cardLine}`, background: "transparent", padding: "16px 20px", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar m={m}/>
            <span style={{ fontWeight: 700, fontSize: 15, color: C.paper }}>{m.name}</span>
            {m.tier === "gold" && <GoldBadge/>}
          </div>
          <div style={{ display: "flex", gap: 8, margin: "7px 0 0 44px", fontSize: 11.5, color: C.textLo }}>
            <span>{m.trades} trades</span><span>·</span><span style={{ color: C.green, fontWeight: 600 }}>{m.completion}%</span><span>·</span><span>👍 {m.likes}%</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 12 }}>
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 25, color: C.paper, letterSpacing: "-.03em", lineHeight: 1 }}>{m.rates[asset]} <span style={{ fontSize: 12, color: C.textLo, fontWeight: 600 }}>{sym}/{asset}</span></div>
              <div style={{ fontSize: 11.5, color: C.textLo, marginTop: 6 }}>Limit {fmt(m.min,0)}–{fmt(m.max,0)} · ≤{m.eta} min</div>
            </div>
            <div style={{ background: side === "buy" ? C.green : C.paper, color: "#fff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 12, textTransform: "capitalize" }}>{side}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ============================================================
//  MERCHANT DETAIL
// ============================================================
function MerchantDetail({ m, side, asset, cur, amount, setAmount, onBack, onStart }) {
  const rate = m.rates[asset];
  const buy = side === "buy";
  const sym = CURRENCIES[cur].symbol;
  const cryptoGross = amount / rate;
  const fee = cryptoGross * 0.01;
  const cryptoNet = buy ? cryptoGross - fee : cryptoGross;
  const valid = amount >= m.min && amount <= m.max && amount <= (buy ? Infinity : m.liq[asset] * rate);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bgDeep }}>
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={iconBtn}>‹</button>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 18, color: C.paper }}>{buy ? "Buy" : "Sell"} {asset}</span>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: buy ? C.green : C.mint, background: `${buy ? C.green : C.mint}1a`, padding: "5px 11px", borderRadius: 9 }}>{buy ? "Cash → Crypto" : "Crypto → Cash"}</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px" }}>
        <div style={{ background: C.card, border: `1.5px solid ${C.cardLine}`, borderRadius: 20, padding: 18, boxShadow: "0 4px 16px -10px rgba(20,40,30,.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar m={m} big/>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}><span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 18, color: C.paper }}>{m.name}</span>{m.tier === "gold" && <GoldBadge/>}</div>
              <div style={{ fontSize: 12, color: C.textLo, marginTop: 3 }}>📍 {m.zone} · open {m.hours}</div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 16, borderTop: `1px solid ${C.cardLine}`, paddingTop: 14 }}>
            <Stat label="Rate" value={rate} sub={sym}/>
            <Stat label="Completion" value={`${m.completion}%`} accent/>
            <Stat label={`${asset} liq.`} value={`${(m.liq[asset]/1000).toFixed(1)}k`}/>
            <Stat label="Pickup" value={`${m.eta}m`}/>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: C.textLo }}>{buy ? "You pay (cash)" : `${cur} to receive`}</label>
          <div style={{ background: C.card, border: `1.5px solid ${valid ? C.cardLine : "#d98a8a"}`, borderRadius: 18, padding: "16px 18px", marginTop: 8, display: "flex", alignItems: "center", boxShadow: "0 4px 16px -10px rgba(20,40,30,.12)" }}>
            <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 22, color: C.mint, marginRight: 8 }}>{sym}</span>
            <input value={amount} onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value.replace(/\D/g,"") || "0")))} inputMode="numeric" style={{ border: "none", outline: "none", fontFamily: FONT, fontWeight: 900, fontSize: 30, color: C.paper, width: "100%", background: "transparent", letterSpacing: "-.02em" }}/>
            <span style={{ fontSize: 13, color: C.textLo, fontWeight: 600 }}>{cur}</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            {[m.min, Math.round((m.min+m.max)/4), Math.round(m.max/2)].map((q) => (
              <button key={q} onClick={() => setAmount(q)} style={{ flex: 1, border: `1.5px solid ${C.cardLine}`, background: amount === q ? C.green : C.card, color: amount === q ? "#fff" : C.textLo, borderRadius: 10, padding: "9px 0", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>{fmt(q,0)}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, padding: "12px 14px", background: C.bg, border: `1px solid ${C.cardLine}`, borderRadius: 14 }}>
            <Coin sym={asset}/>
            <span style={{ fontSize: 13, color: C.textLo, fontWeight: 600 }}>{buy ? "You receive" : "You send"}</span>
            <span style={{ marginLeft: "auto", fontFamily: FONT, fontWeight: 900, fontSize: 18, color: C.paper }}>{(buy ? cryptoNet : cryptoGross).toFixed(2)} {asset}</span>
          </div>
          {!valid && <div style={{ fontSize: 12, color: "#c0593f", marginTop: 8, fontWeight: 600 }}>Enter between {fmt(m.min,0)} and {fmt(m.max,0)} {cur}{!buy ? ` (merchant has ${(m.liq[asset]/1000).toFixed(1)}k ${asset})` : ""}</div>}
        </div>

        <div style={{ background: C.card, border: `1.5px solid ${C.cardLine}`, borderRadius: 18, padding: 16, marginTop: 18, boxShadow: "0 4px 16px -10px rgba(20,40,30,.12)" }}>
          <Row k={buy ? `You receive (${asset})` : "You receive (cash)"} v={buy ? `${cryptoNet.toFixed(2)} ${asset}` : `${fmt(amount,0)} ${cur}`} bold/>
          <Row k="Platform fee (1%)" v={`${fee.toFixed(2)} ${asset}`} muted/>
          <Row k="Settlement" v="On-chain, auto-release" muted/>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, padding: "10px 12px", background: `${C.green}14`, borderRadius: 12 }}>
            <LockIcon/>
            <span style={{ fontSize: 12, color: C.mint, fontWeight: 600, lineHeight: 1.4 }}>{buy ? `${cryptoNet.toFixed(2)} ${asset} is locked in escrow from ${m.name} until you both confirm the cash handoff.` : `Your ${cryptoGross.toFixed(2)} ${asset} is locked in escrow until ${m.name} confirms paying you ${fmt(amount,0)} ${cur} in cash.`}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 20px 28px", borderTop: `1px solid ${C.cardLine}`, background: "#fff", boxShadow: "0 -8px 24px -12px rgba(20,40,30,.12)" }}>
        <PrimaryButton disabled={!valid} side={side} onClick={onStart} label={buy ? `Buy ${cryptoNet.toFixed(2)} ${asset}` : `Sell ${cryptoGross.toFixed(2)} ${asset}`}/>
      </div>
    </div>
  );
}
function Stat({ label, value, sub, accent }) {
  return <div style={{ flex: 1, textAlign: "center" }}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 16, color: accent ? C.green : C.paper }}>{value}{sub && <span style={{ fontSize: 9, color: C.slate, marginLeft: 2 }}>{sub}</span>}</div><div style={{ fontSize: 10.5, color: C.textLo, marginTop: 3 }}>{label}</div></div>;
}
function Row({ k, v, bold, muted }) {
  return <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}><span style={{ fontSize: 13.5, color: muted ? C.slate : C.textLo }}>{k}</span><span style={{ fontSize: bold ? 16 : 13.5, fontWeight: bold ? 900 : 600, color: bold ? C.paper : C.textLo, fontFamily: FONT }}>{v}</span></div>;
}

// ============================================================
//  DUAL-QR ESCROW HANDSHAKE (dark "live session")
// ============================================================
function buildSteps(side, asset, m, cur) {
  const buy = side === "buy";
  return buy ? [
    { key: "locked", label: "Escrow locked", hint: `${asset} from ${m.name} held in Cashta vault`, action: "I'm at the merchant" },
    { key: "scan1", label: "Scan merchant code", hint: "Confirm you're at the right merchant", action: "Scan verification QR" },
    { key: "cash", label: "Hand over cash", hint: `Pay the merchant in ${cur}, in person`, action: "Cash handed over" },
    { key: "paid", label: "Confirm payment", hint: "Optional live proof capture", action: "I Paid" },
    { key: "verify", label: "Merchant verifies cash", hint: "Merchant counts & confirms", action: null },
    { key: "scan2", label: "Scan settlement code", hint: "Final two-sided confirmation", action: "Scan settlement QR" },
    { key: "release", label: `${asset} released to you`, hint: "Auto-settled on-chain", action: "Receive stablecoins" },
  ] : [
    { key: "locked", label: "Your crypto locked", hint: `Your ${asset} held until cash received`, action: "I'm at the merchant" },
    { key: "scan1", label: "Scan merchant code", hint: "Confirm you're at the right merchant", action: "Scan verification QR" },
    { key: "cash", label: "Receive cash", hint: `Merchant pays you ${cur}, in person`, action: "Cash received" },
    { key: "paid", label: "Confirm receipt", hint: "Optional live proof capture", action: "I got the cash" },
    { key: "verify", label: "Merchant confirms payout", hint: "Merchant marks cash paid", action: null },
    { key: "scan2", label: "Scan settlement code", hint: "Final two-sided confirmation", action: "Scan settlement QR" },
    { key: "release", label: `${asset} released to merchant`, hint: "Auto-settled on-chain", action: "Release stablecoins" },
  ];
}
function Handshake({ m, side, asset, cur, amount, onDone, onCancel }) {
  const steps = buildSteps(side, asset, m, cur);
  const [step, setStep] = useState(0);
  const rate = m.rates[asset];
  const cryptoGross = amount / rate;
  const cryptoNet = side === "buy" ? cryptoGross * 0.99 : cryptoGross;
  const cur_ = steps[step], done = step === steps.length - 1;
  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  useEffect(() => { if (cur_.key === "verify") { const t = setTimeout(next, 2200); return () => clearTimeout(t); } }, [step]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: done ? D.green : D.bg, transition: "background .5s" }}>
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        {!done && <button onClick={onCancel} style={{ ...iconBtn, color: D.paper, borderColor: "rgba(255,255,255,.2)", background: "rgba(255,255,255,.08)" }}>✕</button>}
        <div style={{ color: done ? D.bg : D.paper }}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17 }}>{done ? "Swap complete" : `Live ${side} session`}</div>
          <div style={{ fontSize: 12, opacity: .7 }}>with {m.name} · {m.zone}</div>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: FONT, fontWeight: 900, fontSize: 15, color: done ? D.bg : D.paper }}>{cryptoNet.toFixed(2)} <span style={{ fontSize: 10, opacity: .6 }}>{asset}</span></div>
      </div>
      <div style={{ display: "flex", gap: 5, padding: "16px 20px 0" }}>
        {steps.map((s, i) => <div key={s.key} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? (done ? D.bg : D.paper) : "rgba(255,255,255,.18)", transition: "background .3s" }}/>)}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 28px", textAlign: "center" }}>
        <Stage stepKey={cur_.key} done={done} m={m} net={cryptoNet} asset={asset}/>
        <h2 style={{ fontFamily: FONT, fontWeight: 900, fontSize: 26, color: done ? D.bg : D.paper, letterSpacing: "-.03em", margin: "28px 0 8px" }}>{cur_.label}</h2>
        <p style={{ fontSize: 14.5, color: done ? D.bg : "rgba(255,255,255,.72)", opacity: done ? .8 : 1, margin: 0, maxWidth: 270, lineHeight: 1.5 }}>{cur_.hint}</p>
        <div style={{ fontSize: 12, color: done ? D.bg : "rgba(255,255,255,.45)", opacity: .6, marginTop: 14, fontWeight: 600 }}>Step {step + 1} of {steps.length}</div>
      </div>
      <div style={{ padding: "12px 20px 30px" }}>
        {done ? <button onClick={onDone} style={{ width: "100%", height: 56, borderRadius: 16, border: "none", background: D.bg, color: D.paper, fontWeight: 900, fontSize: 16, fontFamily: FONT, cursor: "pointer" }}>Done</button>
          : cur_.action === null ? <div style={{ textAlign: "center", color: "rgba(255,255,255,.7)", fontSize: 14, fontWeight: 600, padding: "18px 0" }}><Spinner/> {cur_.label}…</div>
          : <button onClick={next} style={{ width: "100%", height: 56, borderRadius: 16, border: "none", background: D.paper, color: D.bg, fontWeight: 900, fontSize: 16, fontFamily: FONT, cursor: "pointer", boxShadow: "0 10px 30px -10px rgba(0,0,0,.6)" }}>{cur_.action}</button>}
      </div>
    </div>
  );
}
function Stage({ stepKey, done, m, net, asset }) {
  if (done) return <div style={{ width: 130, height: 130, borderRadius: "50%", background: "rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pop .5s cubic-bezier(.2,.9,.3,1.4) both" }}><svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke={D.bg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg><style>{`@keyframes pop{0%{transform:scale(.4);opacity:0}100%{transform:scale(1);opacity:1}}`}</style></div>;
  if (stepKey === "scan1" || stepKey === "scan2") return <QRStage settlement={stepKey === "scan2"}/>;
  if (stepKey === "locked") return <VaultStage net={net} asset={asset}/>;
  if (stepKey === "cash") return <div style={{ fontSize: 84, animation: "sway 1.8s ease-in-out infinite" }}>💵<style>{`@keyframes sway{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg) translateY(-8px)}}`}</style></div>;
  if (stepKey === "paid") return <ProofStage/>;
  if (stepKey === "verify") return <VerifyStage m={m}/>;
  return null;
}
function QRStage({ settlement }) {
  const cells = [];
  for (let r = 0; r < 11; r++) for (let c = 0; c < 11; c++) { const on = (Math.sin(r*12.9+c*78.2+(settlement?3:0))*43758.5)%1 > 0.45; if (on) cells.push(<rect key={`${r}-${c}`} x={c*9+6} y={r*9+6} width="9" height="9" fill={D.bg}/>); }
  const finder = (x,y) => <g><rect x={x} y={y} width="27" height="27" fill={D.bg}/><rect x={x+4.5} y={y+4.5} width="18" height="18" fill="#fff"/><rect x={x+9} y={y+9} width="9" height="9" fill={D.bg}/></g>;
  return <div style={{ position: "relative", padding: 16, background: "#fff", borderRadius: 24, boxShadow: "0 24px 60px -16px rgba(0,0,0,.5)", animation: "pop .4s ease both" }}><svg width="150" height="150" viewBox="0 0 111 111">{cells}{finder(6,6)}{finder(78,6)}{finder(6,78)}</svg><div style={{ position: "absolute", top: 16, left: 16, right: 16, height: 2, background: settlement ? D.mint : D.green, boxShadow: `0 0 10px ${settlement ? D.mint : D.green}`, animation: "scan 1.6s ease-in-out infinite" }}/><style>{`@keyframes scan{0%,100%{transform:translateY(0)}50%{transform:translateY(116px)}}@keyframes pop{0%{transform:scale(.85);opacity:0}100%{transform:scale(1);opacity:1}}`}</style></div>;
}
function VaultStage({ net, asset }) {
  return <div style={{ position: "relative", width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px dashed rgba(255,255,255,.25)", animation: "spin 14s linear infinite" }}/><div style={{ width: 96, height: 96, borderRadius: 28, background: "rgba(255,255,255,.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}><LockIcon big/><span style={{ fontFamily: FONT, fontWeight: 900, color: D.paper, fontSize: 13 }}>{net.toFixed(0)} {asset}</span></div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
}
function ProofStage() {
  return <div style={{ width: 130, height: 130, borderRadius: 28, border: "3px solid rgba(255,255,255,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"/><circle cx="12" cy="12.5" r="3.5"/></svg></div>;
}
function VerifyStage({ m }) {
  return <div style={{ width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}><div style={{ position: "absolute", inset: -6, borderRadius: "50%", border: "3px solid transparent", borderTopColor: "#fff", animation: "spin 1s linear infinite" }}/><Avatar m={m} big/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
}

// ============================================================
//  MERCHANT DASHBOARD (yellow highlight card from reference)
// ============================================================
function MerchantDash({ cur, onBack }) {
  const [spread, setSpread] = useState(0.8);
  const [a, setA] = useState("USDT");
  const base = CURRENCIES[cur].rate;
  const sym = CURRENCIES[cur].symbol;
  const me = { rate: +(base * (1 + spread/100)).toFixed(base < 10 ? 3 : 0), liq: 18420, today: 12, earned: 642.18 };
  const reqs = [{ n: "Yusuf K.", a: base*900, t: "2 min ago", side: "buy" }, { n: "Lina M.", a: base*300, t: "8 min ago", side: "sell" }, { n: "Omar R.", a: base*2400, t: "15 min ago", side: "buy" }];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bgDeep }}>
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={iconBtn}>‹</button>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 18, color: C.paper }}>Merchant console</span>
        <span style={{ marginLeft: "auto" }}><GoldBadge/></span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 90px" }}>
        {/* yellow earnings hero (reference aesthetic) */}
        <div style={{ background: C.yellow, borderRadius: 24, padding: 22, position: "relative", overflow: "hidden", boxShadow: "0 14px 36px -14px rgba(214,200,60,.7)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "#5c5a1e", fontWeight: 700 }}>Earned today</span>
            <span style={{ fontSize: 11, color: "#5c5a1e", fontWeight: 600, background: "rgba(0,0,0,.06)", padding: "4px 10px", borderRadius: 8 }}>{CURRENCIES[cur].flag} {cur}</span>
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 42, letterSpacing: "-.04em", marginTop: 6, color: "#2a2906" }}>{me.earned} <span style={{ fontSize: 15, opacity: .55 }}>{a}</span></div>
          <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
            <YStat label="Swaps" value={me.today}/><YStat label="Liquidity" value={`${(me.liq/1000).toFixed(1)}k`}/><YStat label="Your rate" value={me.rate}/>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {Object.keys(ASSETS).map((k) => (
            <button key={k} onClick={() => setA(k)} style={{ flex: 1, border: `1.5px solid ${a === k ? ASSETS[k].color : C.cardLine}`, background: a === k ? `${ASSETS[k].color}18` : C.card, color: C.paper, borderRadius: 14, padding: "12px 0", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Coin sym={k}/>{k} liquidity</button>
          ))}
        </div>

        <div style={{ background: C.card, border: `1.5px solid ${C.cardLine}`, borderRadius: 20, padding: 18, marginTop: 14, boxShadow: "0 4px 16px -10px rgba(20,40,30,.12)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: C.paper }}>Your spread</span>
            <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 18, color: C.green }}>{spread.toFixed(1)}%</span>
          </div>
          <input type="range" min="0.2" max="2.5" step="0.1" value={spread} onChange={(e) => setSpread(parseFloat(e.target.value))} style={{ width: "100%", marginTop: 14, accentColor: C.green }}/>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textLo, marginTop: 4 }}><span>More volume</span><span>More margin</span></div>
        </div>

        <div style={{ marginTop: 20, marginBottom: 10, fontWeight: 700, fontSize: 14, color: C.textLo }}>Incoming swap requests</div>
        {reqs.map((r, i) => (
          <div key={i} style={{ background: C.card, border: `1.5px solid ${C.cardLine}`, borderRadius: 16, padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 4px 16px -12px rgba(20,40,30,.12)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: C.mint, fontFamily: FONT }}>{r.n[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: C.paper }}>{r.n} <span style={{ fontSize: 10, fontWeight: 700, color: r.side === "buy" ? C.green : C.mint, marginLeft: 4 }}>{r.side.toUpperCase()}</span></div>
              <div style={{ fontSize: 11.5, color: C.textLo }}>{fmt(Math.round(r.a),0)} {cur} · {r.t}</div>
            </div>
            <button style={{ border: "none", background: C.green, color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 11, cursor: "pointer" }}>Accept</button>
          </div>
        ))}
      </div>
      <TabBar active="merchant"/>
    </div>
  );
}
function YStat({ label, value }) { return <div><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 17, color: "#2a2906" }}>{value}</div><div style={{ fontSize: 10.5, color: "#5c5a1e", opacity: .8, marginTop: 2 }}>{label}</div></div>; }

// ============================================================
//  SHARED
// ============================================================
function Avatar({ m, big }) {
  const s = big ? 48 : 34, gold = m.tier === "gold";
  return <div style={{ position: "relative", width: s, height: s }}><div style={{ width: s, height: s, borderRadius: "50%", background: gold ? C.green : C.bg, color: gold ? "#fff" : C.mint, border: `1.5px solid ${gold ? C.mintFill : C.cardLine}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 900, fontSize: big ? 18 : 13 }}>{m.initial}</div><div style={{ position: "absolute", bottom: 0, right: 0, width: s*0.28, height: s*0.28, borderRadius: "50%", background: C.green, border: "2px solid #fff" }}/></div>;
}
const GoldBadge = () => <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: `${C.green}16`, color: C.green, fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 7 }}><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l3 5.5L21 8l-4 4 1 6-6-3-6 3 1-6-4-4 6-1.5z"/></svg>VERIFIED</span>;
const LockIcon = ({ big }) => <svg width={big ? 30 : 16} height={big ? 30 : 16} viewBox="0 0 24 24" fill="none" stroke={big ? "#fff" : C.mint} strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
const Spinner = () => <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .8s linear infinite", verticalAlign: "middle", marginRight: 8 }}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></span>;
function PrimaryButton({ label, onClick, disabled, side }) {
  const bg = disabled ? C.cardLine : (side === "sell" ? C.paper : C.green);
  return <button onClick={onClick} disabled={disabled} style={{ width: "100%", height: 56, borderRadius: 16, border: "none", background: bg, color: disabled ? C.textLo : "#fff", fontWeight: 900, fontSize: 16, fontFamily: FONT, cursor: disabled ? "not-allowed" : "pointer", boxShadow: disabled ? "none" : `0 12px 30px -10px ${bg}66`, transition: "all .15s" }}>{label}</button>;
}
function TabBar({ active }) {
  const tabs = [["market","Market",<MShop/>],["orders","Orders",<MClock/>],["chat","Chat",<MChat/>],["profile","Profile",<MUser/>]];
  return <div style={{ borderTop: `1px solid ${C.cardLine}`, background: "rgba(255,255,255,.92)", backdropFilter: "blur(12px)", display: "flex", padding: "10px 8px 22px" }}>{tabs.map(([k,lbl,icon]) => <div key={k} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: active === k ? C.green : C.textLo }}>{icon}<span style={{ fontSize: 10.5, fontWeight: active === k ? 700 : 500 }}>{lbl}</span></div>)}</div>;
}
const MShop = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 9l1-4h12l1 4M4 9v9h14V9M4 9h14" strokeLinejoin="round"/></svg>;
const MClock = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M11 6v5l3 2" strokeLinecap="round"/></svg>;
const MChat = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h14v10H9l-4 3V5z" strokeLinejoin="round"/></svg>;
const MUser = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="7" r="3.5"/><path d="M4 19c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round"/></svg>;
const iconBtn = { width: 36, height: 36, borderRadius: 11, border: `1.5px solid ${C.cardLine}`, background: C.card, color: C.paper, fontSize: 20, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 };
