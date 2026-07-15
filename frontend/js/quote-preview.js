// Quote Preview, Print & PDF
const CAYAN_LOGO_B64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCACqAOQDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAYHAQgDBAUCCf/EAEIQAAEDAwIEBAQBCQYFBQAAAAECAwQABREGIQcSMUETUWFxFCIygZEIFSNCUmJygqEWJTNDscEXRJLC0TSTovDx/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAMEAgUGAQf/xAAzEQABAwIEAwUHBQEBAAAAAAABAAIRAwQFITFBElFhExRxkaEGIjJCgbHRFSPB4fBy8f/aAAwDAQACEQMRAD8A/VOlKURKUpREpSlESlKwelEWNvOvJv2pbFpiJ8ZfbkzFb/VCzlSz5JSN1H2FQTiZxii6YDtl0843Kuu6XHPqbjH1/aX+70HfyNEtN6i1pe0NJVJuVxlKwCtRUo+5PRI+wArl8T9o2WtTu9s3jqadAeXU9FtrTC3Vm9rWPC31/pWnqX8omUt1UfStpbQgbB+ZkqV6hCTgfcn2rxYjnG/XX6WPKubcZf8AmAiI0U+hHLzD2zVj6C4N2TSyGbhdWm7hdQAouLGW2VeSEny/aO+22KsfGB0xUdHCr++HaX9YtB+VuXn/AIrKpe29seG2pg9Tmtf2+BvEWWA5P1HFQcbBUp5xQ9/lx+BNcg4F8QIp8eFqiKHU7p5ZDyD+ITtV+5x3p98VaHsxYjnPOSov1a56eS15lxOO+iUfFGbPmR0dVJcExOPVKsqA9cCu3YPyiLowtLOpbKxIb6F2IS24PUpUSFH7pq+vbBFV/wAQOEtm1klybEbRBu2CRIQnCXT2DgHX+Lr74xVa4wm+sm9ph9YmPlcZ8pyUlK9t654bmmB1GS9zSmvdM6yaU5ZZ4U6gZcjujkdR6lPceoyPWovP1u5O4wWbSkCUoxIiHxKCF/K48WFqAVjY8oA9iT5Vr3dLZcbFcnrZcmFxpcVfKtB6pI6EHuOhBHUYNSbg+vk4kWVXm46PxZWP961LPaS5uqlK1qN4XcQ4iN4IyjbzV12E0qTH1mukcJjy1lbWUpSvoK5tKUpREpSlESlKURKUpREpSlESlKURKUpRErBrNKIvgdhjFVXxo4kr09EOmbHJKblJRl91B+aM0fI9lq7dwN+4NTTXmqmdH6Zl3pfKp1KfDjtq6LdVske3c+gNamT50y6TH7jPfW/IkrLjriuqlGuS9p8ZNlT7tRPvuGZ5D8lbnCLEXDu1qfCPUrg+Zau6lKPuSa2c4S8PW9G2UTpzQN2noSp8kbso6hoe3U+Z9hVScEtKo1Fq9M2UyVxbUkSVjHyqdzhtJ++VfyVs1jA3qj7J4W1wN9UGeg/k/wAKxjd3BFuzxP8AAX1SlK7tc8uncJIhwZEso5/AaW5y5xzcoJxnt0rpaZv8XUtkhXiMpA+JZQ4tCVhXhrIBUgnzByPtXHrO4N2rSt1nOJCktxVhKP21qHKlP3UQPvUC4J6Y0fJskPVMOETdmS5HfWXlnkcB3+XPLukpPTvWsrXT2XrLdkEEEkExuNNZ8FZp0WuoOqunIwPJW1SlK2arKr+N2hkagsitQW+ODcbagqXyj5nWBupPqU/UP5h3qm+Fi+TiDZDj/mMfikitsVJSoEK3BrW06e/snxshW1trljquLb0bsPCcOQB7ZKf5a4rHsOFG8o3tMauAd4zkVvsNui63qW7tgSFsoOlZrA6Vmu0Gi0KUpSvUSlKURKUpREpSlESlKURKUpREpSlESlKwdgTXhMCUWvX5QepDOv8AG02w4fCtrfiPAHYvOAEZ9kY/6jVT162q7sq+alud2UvIlSnFo9Ec3yj7JwK8mvjGKXRvbx9U7nLwGQXeWVEW9BrOQ9d1sjwEsyLdon85KRhy5yFu5I35EnkSPbKVH+arLPWvC0PD/N+jrLDKcKbgshQ/eKAVf1Jr3utfWcNoi3tKdMbAee/quKuqhq13PO5KzSlcTzrbDa3nVpQ2hJUpROAkDck1emBJUCgetriZ+ttMaLbknkfcXcJjXJkKQyOdrJI6Fbats9t+1Vxwrv6tFa9m6XmOEQp0pyHv0Q+hZSg/f6T/ABJ8q9Xh1djrPjJdNRlJDLMZ0sAgjCAUNo2PQlJJPrmvL4ladCdS6icwpIjOx7mOUfN8O6kNvLA7lLgQR7GuGuq9SsRiNLVryB/yB9jC39Gm2nNq/donxJ/iR5LYbNMDoKiHDnVLuo7MWLgpIultUI0xIOeZQHyug90rG4PTripd6Guyt67bik2qzQrRVKZpPLHahPXtUevGiLDfb1bdQTmHDNtawtlSF4CsHmAUO4Ctx0/DapEPKvn71nUpMqt4XiRr5LxrnMMtML6rNKVKvEpSlESlKURKUpREpSlESlKURKUpREpSlEXz02ro36UqDZLhNbOFMRnXE+6UE/7V3sE715GsEKc0peWkdVQJCR7ltVQXBIpOI1grKmJeJ5rTqlKV8R+f6r6F8q3Ut7fgwY7X7DSE/gkV2P1q6VkkfE2eDJznxYzS8+6Aa73fNfcKJBptI5L56/4isEb71XXF/Uhh2eRY4jgClxi/MV15GM8qW/d1ZCP4ec9ql+pr/E0zaXbtMStfJhDTKN1vOq2Q2kdyT/57VTmqRKZecRdXEuTorRv97WndCX+XkiRR+6kqSMb5BJrUY1d9nQdSYcyM+gP5+0q5YUg+oHO0H+/3WF3fydrapt+/z3cEoU1GSoHIJHMVb/8ATUr1tEix9b2CfLaCod5ZkWKZnopLg5m0/dWa6/AS2GDoYTFf8/KddB80pw2P6oP417fFG1vXPRsx6JkS7cUT4ygMlK2jzZHry8w+9VbK1LMHaIkgcUc85jyU1xV4r5xJyOXpH3Vc2hV00VcH7ihC3ZGmFpgXZlPWVbVbsSAO6kJ29kjOBmrshzI0+KzNhupdYkIDjbiTkKSRkEVXGo5rLP5k4rwmvFgyI6Il2ZxzBUR3uR3KFncd9h0FdjT8k6BvjWl5L/i6eu6i7ZpRVlLLitzHKvI5yk9898nGVhU7k80z8BIz5TofA6Hr4rG4b27Q75vxqPEa+CsmlYHSs10i1qUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIldebHRMiPxVnCXm1Nk+hGP965wc1msXNDmwUBjMLSR5lyO84w6nlW2ooUPIg4NfFTLizppzTWtZzYSfh56jMjq/dWSVD7K5h7Y86htfEbui61rvpO1BIX0ChUFakKjdwtseF1xFy0BZZAUFFuMGD7tko/7akc2ZEt8V2dOfQywygrccWcJSkdSap/8n7UsZqyXWzzpSGkwV/GBTisBLShhZyegBSCf4q9tpcri3c/FW26xo6C7lIUClVzdSe46+GCP/p+n6lYYiKljSNPN7hAHUZEnkBqVx9za8Nw/iyaDM+OcDqvkXZu7B/ifqRK2bJaUKNmiLGFOq6eOoH9dRwEA9M59TCdZCbadIMm6EJvGp5SrvPCh/hstjLTRHYZKAAehyKnyw1xD1U3DjNg6Z006FOco/RypaR8qB2KED7fYg1C9WzWdTawemPLBg/Gpt7ZO4MSIPHlKA/i5cGtTiM9kTMkmAeZOp8PlHirdqIqCRpmRyGw8dyrEgXzT3DbSNntl8ntsSG4raRHQCt1xwj5uVA3xzE79K9qwar03q+M6qx3FuYlA5XkFJStGeykKAIB37Y2NRzhhbBdoiuIN4WmRdbyVKSSMiKylRSlpvyGBue+fufriLaF2lscQtPoLN0tWFvhvYS43MPEQ4O+Bk56jHtjc0a1enbNrADswB7sGYjWZ5ZxCpPZTdVNMk8ROu08o8cplcOgY0ePH1Bw0urQcZtr7iWm1/5kN/Kk+/U58siurYLXHnwrlwi1aS85bkhyA8dluRSf0TiD2Ug/L/TcZrn1LPi2y+6d4nQHAbdNQmBOcxjMd35mnD5BKtz9hXq6/sM6XHi6q06n++rIovsAD/1DX+YycdQoZx69OtQNpjsyGieDbmw5jy26hSFx4gSY4s55OH+8iuPR2orhCnK0Nq13+94qcxZJ2TPYHRaSf1wB8w67E771Njk5qFzIVm4o6WiXW3yVxZSf08KU2cOxJA6g48iMKHfGfI196P1hLmy3dK6qjoh6ghJypI2blt9nmj3B7jtv6gXrav2RbSeZafhPMcj15c1Xq0+OXNEEajl1HT7KZ0rArNbRVUpSlESlKURKUpREpSlESlKURKUpREpSlESlKURV7xi0SdXadMmE1zXG28zzAAyXE4+ZHuQAR6gDvWsdbuHHQ1r5xq4bLs8xzVdkjFUCSrmlNoTsw4T9WOyVH8D7iuH9qsHNQd9ojMfF4bH/AGy3+D3wZ+xUPh+FXGn5ECPd4wu5fNucdQiahlZSVs8wJBx1GwOPTscGtiL9enrq61w+4fqaaUWUiZMZT+it8YjYJxtzqH0gf06jWWrt4A6xtjTTmj5LLMeW44p9h0DBkbbpUe6gOnp7b6b2cuw2obN54Q/ffwB2lXsVoEsFcCS3bbx+ineonoPDjQS4lkZKHGmxDgtjdbkhzZJ9VZJUfPBqrbhbXLbEuFsiqC3LVCYsDRzs7Olr55Cge5CSpPtirlvul136/We5yZwES0OLkfCcn+I8RhCyrP6vUDFV6jhVr9uUnGpbUtlu5quyeZhRKpB6OKGNz6ZwK6jFLSvUcGsYeECBEZCNdeZ9Fp7SuxolzszmZnn+PupXweUWtGi0rVldqmyoSj3yl0n/AEUK7nFKaIHD69yCcc8Ysf8AuKCP+6s6D0rc9MRrkLtcGJT9ynLnLLDZQhK1gc2AfMiufXmmperdPLs0KY3FWp5p3mcQVJUEKCuUgeoH4VsmUqrcN7KDxcJAGU6QOiql7DdcZOUg/wAqL6Ht4umlLzwx1AMvWpaohzurwHBzsue4zkeXKK9rhrepcyzuafvBIu1hc+ClhRyVBP8AhuDzCkjr3IJrxo+ieIrGozqUaotSZbrCYz3LEUA42FZGR05h0B8ql7emIjOqXNVsyHm5L8URX2kEeG9g5SpQxnmA2B8qgsaNdvAS0jhlucZt20JzCkuH0zxCQZzynI7/AEKi0/PDTU6r02gjTV9eAnJH0w5R2D3ohXQ+v2FdniDcbTCuelwY7L1zlXVhuI6RlbTRcSHVA+RSQn+bPUZqUakNlFinHUPhfm7wVfE+J9PJ/wCfLG+cY3rWmxXhd64h6fSy5JVChTY8aEh9znW2wlwcoJ8+pONt8DAAFVcTuv05wt2QQ8iBu3MTly3CmtKPegahyLQZPPLL68+i2q60HmKqfjnxfncNY0GBY4rD1yuAWsOPgqbabSQCeUEZUSdt8DBzXj8DeOd415eH9M6nixhKDCpEeRHQUBYSRzIUnJ33yCMDANX3Y3aU7wWLne+emUnQeKrCxrGj3gD3VeVKUrcqmlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiVwvssyWVsPtpcbcSULQsZCgdiCD1FcuazXhAcIKaZrXfiXwZl2Vb190syuRbiSp2KAS5HHcp7qR/Ueo3qrGnXWHUPMuKbcbUFIWk4UkjoQR0NbskefSq/1pwc0zqta5sdJtk9e5fYSOVw+a0bA+4wfMmuJxb2W43GvZZHl+Dst/ZYxwgU7jMc/yo5w643xJrbNm1k8GJScIROOzbnl4n7KvXoe+KuBt1DzaXG1pUhQyFJOQR5g1rDqHgvrixKW4xbxco6dw7EPMSPVH1Z9gfevGsusNZ6KeMe3XGXC5T80Z5OUZ75bWMA+uM1FZ4/eYaBRxCmSBvv/AH5rOthlC6/ctXjw2/pbdZ9qfhWvUD8onVLCAifabfKUP1087ZPvuR+AFd178pC6KbIj6XioX2K5KlD8AB/rW6b7T4cRJcR9CqBwi6BiPUK+CdvOuhdrxbbHAdud1mNxozKcrcWdvYdyT2A3NUKri1xX1TmNYbeG+fbMCEpZA/iVzY99vtXLb+DfEPVslMzV91XFQdyqS+ZDoHklIOB7FQx5Vg7H33Pu2NFzjzIgea9GGilncVA0ctSvD4l8TZmuZaYMBDjFqZXltkn5nldlrx38h2poLSV/tuudNvXa0yIrcqSXWi6jl5g2kqOx3G2OtXdpHhZpTR5EmLD+KmJ3+KkYWtJ/dGMJ+wz6mpQ7CiSJEeVJjtuPRVKUw4UgqbKklJKT2yCRVKj7O3FxWF5evl8gwNIB08lO/FKdJnYUGe7BE/RQTi5wihcUYMRQuBgXCCVeA94fOhSVY5kLTkZGwwc7b9c15fCHgZG4az5F7uF2FwuTrRZb5GyhtlskFWASSpRwN9sDbG9Wzjam2K37sJs33QvCz3xvn5xzWtF3WFHsA73V9UpStmqyUpSiJSlKIlKUoiUpSiJSlKIlYNZpRFxjAO3cV5OotS2fTMREq7SigvLDTDLaFOPPuHohttIKlqPkB77V6+QKqzQ7qtb8S9Sasm/PH088bNa2zulsj/GcH7ysAZ8jiqV1cOpOZTZ8TjAnQQJJUtKmHgvdoFKYmu0O3a32e56ZvdqcunMIa5TTSkOlKSopJacWUHlBOFhPSpWcd6j+sLhaNPWheqrowV/mdK3mMKIUVqSUBI7ZVzcu/nUI1Om8Paq0Tal3y4M3S5SlTJ6Is51plEZpHOpoNJUElJUQnmUCo4OT2qF9061lrzxGRGxgkAT1mfosm0u1gtyGfpn9la+evnWN6q+/L1RovXlj1BM1PLuNqvcs2qVDWkIZjqcJLCm0DYYwAVHKjg774DS9+ur90f0si7yH3rndLjNTIW5zqi29p3wwG+bOOZwFKewHMR0FBiTQ803tIdMRl0jfde92PDxAyI/9VobdK4JUKHNaLMuKy+g/quICh+BqtNBKuUy8a1uFsvUxUKPPRboSZ05+U2z4QHjuJDilbkkkdsgDpUCcuuvLlw7fvDWq7pGN8vpZs6GpCjId53glILh3Q2lKFYQjGTkk42qtUxVjWAupkyCdtAY35qRloS6A6Ij1Eq816H0Y4StzSVnUT3MFok//ABqKX/UHDjSEadOiaLRMYtSsTHrfbmA2wvIHLzrKEqXkgFKCpQ7gVOnkTGLS42w4XpSI5CFHqtwJ2P3NUzqr84XDQWhNDR7U4zcb3KZVKhy+ZhSgz875cPKpSQpfzFXKSc5wa9xAsoU+KmwAxIyBzkAD6kpbg1HAOcSJ57akqxG9czI7UN6ToDUEWNKdYYbdUYRSkuqCUcyUSCoDKhn5dql4I5jtXgWqVrKQ/LZvFmttvbQyn4VcaYuUlbp5s5Km2ykJwnbl3zse1V3pxu8y+KCrVer/AHLOnbc1Muik3N9MeVLcAIAbyltLKRkgBAzj5sipe9G34AZPEYGURz2+qwFLtOI6QJ5q4yDknHtTG+RVPP60ucRUe1QZN1lq1XdpUqGWyXX2rchIz4XNsgLUDyEkJSlfNkYzXFfmdb6K4d6hu0+9y2TLcdciR1z3JEmJ4hQ2wyl9RJyCSpRBO4ABOSa8dirBxENJDQSSNt/wvRamQCQJ067K59q86ZebXEuUKzyJzaZ08r+HYJytwJSVKOB0AA3J26DqRVVW1vWzOvtG2a5aqnqeYtrku5Q23CWEtJQEIDhPzOuKXnKlE7/SB35bPaLpqXjPfbiNU3IM6bYaiNOpbikhbp8RbO7JHIBtnHP+9WIxRz44GGS4CDHKTvy9V73UNkuIgCfWB6q4uYCsE5qrddTpC9fwdP3+63i2Wa7QgxbZVumLjBE7nPMFqQd1FPKEhWU+m5IsqKyuNFajrkOvFpCUFx0grXgY5lEADJ6nar1G47Z72gRwmOqgfT4ACTqu1SlKtqNKUpREpSlESlKURKUpREpSlEXwry8xVU6Vj3HhnqrUUK42e5SbNe5q7nDmwYbssNrV9bTiGkqWk9MHGDjrVrlO3WmB5VUuLbtnNeDDmmQfHIj6qRlThBbqCoLqbTt34maYuVnmlVjjSXGVQVqb55CeRQUXHUcwAyQMIyCBuTk8o8xzg29L1FD1FeNa3Ga43CMSYC2ltcoE5I50keE2QAChABxzfNlSibMxt/vXmX+zm/WmRaRcp9u+IAT8TAf8F9vBByheDjpjp0JqGvh9Gp+49vE4RuRMGRplqVmy4e0cLTA8OeqiPF6E9erRatM2l1KLpNuUdyGQMloNKC1vEfsoSN/Ugd6+JPCZX9obbebLqmda2IdsFqkMMNpLkhoKKs+KfoUSclQHNncEHepFpfQ9r0qHHmZdwuM11IQ7PuUpUiStAOQnnV0SP2UgCpEf9Kx7gy4ca1w33jGQJyjTPLPmve8OpgMpnITtrKrfS3CH+y9mudvZ1K+/JmtyW4zxY5GonjfUpLQV8yvpypSs4SAMDauy5wpQbbpG1Rr2thrSxKsojjMhZRy84+b9GoEqUD82Ce9WAM7Uz2qRuGWzWhgbkBGp5g/cLE3NUu4ic/6hdaFEYgRGYUVJS0w2ltCSoqISBgbnc+5qvb9w21xd9WNaujcQ4cGTEZXGipbsgcDLalZV9bxBURsVY9gKsvvjNYxipa9pSuWhlQGBmIJGmmixp1XUyXN1PMA/dQpnRepJ8u1v6v1bHuaLTLE5j4e2mI6t4JKU86g6pJT8x2CRnzxtWLlwutF31nI1XPnylNyojUaRAQeRl/w1EjxSN1p+n5NgeXfIOKm2f/ys5NYGxoOEOE5zmSc4jfove3eDIMbZQPsoFrLhpM1HqWz6psmqnrHKtTLkbLURD3M0vqE8xwk4yMkK6jbauW7cM4dxsdt0/Huz7caLc2rjMVIzIemqQrmUFrKhgqOCTggYGBipxk52rB8+tP0+gXOPD8WuZ6dctNk7epAE6aKHf8P23dcztYSro463KZjNIiJb5eTwTzAFYV8ySvCinA3AySNj0LHwoTa79dbrP1HMnRrhclXNMBKQy0l0nKS4Unmd5cDAJCds8pNWAAMV9EZNeHD7ckO4cwSdTqU7xUiJ2A8lXzfDW7yUQbbf9YO3S1264i4sodin4pakrKm0OvqcVzJST+qhJIAGQKsBO21PtWcVNRt6dCeAa9SfusHvL9VmlKVYWKUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiLFZpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIlKUoiUpSiJSlKIv/Z';
function renderCayanLogo() {
  return '<img class="qp-logo-img" src="' + CAYAN_LOGO_B64 + '" alt="Cayan Events Ke.">';
}

function groupItemsBySection(items) {
  // items: [{ section, subsection?, name, qty, unit_price, price }]
  const groups = [];
  let currentSection = null;
  let currentSubsection = null;

  for (const item of items) {
    if (item.section && item.section !== currentSection) {
      currentSection = item.section;
      currentSubsection = null;
      groups.push({ type: 'section', label: item.section });
    }
    if (item.subsection && item.subsection !== currentSubsection) {
      currentSubsection = item.subsection;
      groups.push({ type: 'subsection', label: item.subsection });
    }
    if (item.subtotal_label) {
      groups.push({ type: 'subtotal', label: item.subtotal_label, amount: item.price });
    } else {
      groups.push({ type: 'item', item });
    }
  }
  return groups;
}

function renderQuotePreviewHTML(quote, company) {
  const c = company || {};
  const phone = c.phone || '0737 611 658';
  const email = c.email || 'cayaneventsanddecor@gmail.com';
  const address = c.address || 'Mokoyeti West Road, Karen';
  const companyName = c.name || 'Cayan Events Ke.';
  const logo = c.logo || null; // base64
  const currency = c.currency || 'KES';
  const vatRate = Number(quote.vat_rate || 16);
  const subtotal = Number(quote.subtotal || 0);
  const vatAmount = Number(quote.vat_amount || (subtotal * vatRate / 100));
  const total = Number(quote.total || (subtotal + vatAmount));
  const items = quote.items || [];
  const groups = groupItemsBySection(items);

  // Build table rows
  let rowHtml = '';
  let rowIdx = 0;
  for (const g of groups) {
    if (g.type === 'section') {
      rowHtml += `<tr class="qp-section-row"><td></td><td colspan="3" style="text-align:left;">${g.label}</td></tr>`;
      rowIdx = 0;
    } else if (g.type === 'subsection') {
      rowHtml += `<tr class="qp-subsection-row"><td></td><td colspan="3" style="text-align:left;">${g.label}</td></tr>`;
      rowIdx = 0;
    } else if (g.type === 'subtotal') {
      rowHtml += `<tr class="qp-subtotal-row">
        <td colspan="2"></td>
        <td>${g.label}</td>
        <td>${helpers.fmt(g.amount)}</td>
      </tr>`;
    } else if (g.type === 'item') {
      const it = g.item;
      const evenClass = rowIdx % 2 === 0 ? '' : 'even';
      rowIdx++;
      rowHtml += `<tr class="${evenClass}">
        <td style="text-align:center;">${it.qty || ''}</td>
        <td>${it.name || ''}</td>
        <td>${it.unit_price ? helpers.fmt(it.unit_price) : ''}</td>
        <td>${it.price ? helpers.fmt(it.price) : ''}</td>
      </tr>`;
    }
  }

  const logoHtml = logo
    ? '<img src="' + logo + '" alt="Logo" class="qp-logo-img"/>'
    : renderCayanLogo();

  return `
  <div class="qp-controls">
    <button onclick="printQuote(window.__currentQuote, window.__currentCompany)" style="background:#2563EB;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;">🖨 Print / Save PDF</button>
    <button onclick="document.querySelector('.quote-preview-overlay').remove()" style="background:#374151;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;">✕ Close</button>
  </div>

  <!-- HEADER -->
  <div class="qp-header">
    <div class="qp-logo-area">
      ${logoHtml}
      <div class="qp-logo-text">${companyName}</div>
    </div>
    <div class="qp-contact-info">
      <table style="border:none;border-collapse:collapse;font-size:8pt;line-height:1.6;">
        <tr>
          <td style="font-weight:700;padding:0 3px 0 0;white-space:nowrap;">Phone:</td>
          <td style="padding:0;white-space:nowrap;">${phone}</td>
        </tr>
        <tr>
          <td style="font-weight:700;padding:0 3px 0 0;white-space:nowrap;">E-mail:</td>
          <td style="padding:0;text-decoration:underline;color:#000;white-space:nowrap;">${email}</td>
        </tr>
        <tr>
          <td style="font-weight:700;padding:0 3px 0 0;white-space:nowrap;">Address</td>
          <td style="padding:0;white-space:nowrap;">${address}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- TITLE + META -->
  <div class="qp-title-block">
    <h1>QUOTATION</h1>
    <div class="qp-meta">
      <div><strong>Statement No :</strong> ${quote.number || ''}</div>
      <div><strong>Bill to:</strong> ${quote.client_name || ''}</div>
      <div><strong>Venue:</strong> ${quote.venue || 'NAIROBI'}</div>
      <div><strong>No of Guests:</strong> ${quote.no_of_guests || ''}</div>
      <div><strong>Date:</strong> ${quote.quote_date ? helpers.formatDate(quote.quote_date) : ''}</div>
      <div><strong>Contact Person:</strong> ${quote.contact_person || quote.client_name || ''}</div>
    </div>
  </div>

  <!-- ITEMS TABLE -->
  <table class="qp-table">
    <thead>
      <tr>
        <th style="width:8%;">Qty</th>
        <th style="width:56%;">Description</th>
        <th style="width:18%;">Unit Price</th>
        <th style="width:18%;">Price</th>
      </tr>
    </thead>
    <tbody>
      ${rowHtml}
    </tbody>
  </table>

  <!-- TOTALS -->
  <table class="qp-totals-table">
    <tr>
      <td colspan="2" style="border-top:2px solid #bbb;"></td>
    </tr>
    <tr>
      <td class="total-label" style="font-weight:700;">TOTAL</td>
      <td style="text-align:right;font-weight:700;">${helpers.fmt(subtotal)}</td>
    </tr>
    <tr>
      <td>VAT ${vatRate}%</td>
      <td style="text-align:right;">${helpers.fmt(vatAmount)}</td>
    </tr>
    <tr class="total-grand">
      <td style="padding:5px 8px;">TOTAL VAT INC.</td>
      <td style="text-align:right;padding:5px 8px;">${helpers.fmt(total)}</td>
    </tr>
  </table>

  <!-- TERMS AND CONDITIONS -->
  <div class="qp-terms-header">Terms and Conditions</div>
  <ul class="qp-terms-list">
    ${(() => {
      let terms = [];
      try { terms = JSON.parse(c.terms || '[]'); } catch(e) { terms = []; }
      if (!terms.length) terms = [
        'Full payment before delivery.',
        companyName + ' the sole responsibility of supplying and arranging the above facilities.',
        'The client agrees to forfeit the full deposit paid upon booking of the items against cancellation of an order, as this hinder ' + companyName + ' against confirming other orders.',
        'It is understood and agreed that ' + companyName + ' has no obligation to deliver or provide the required equipment until the full payment has been made not withstanding a booking having been confirmed.',
        'The client agrees to safe guard the equipment and be solely responsible for any loss or damage of the same, that may occur while under the Clients responsibility or in their premises.',
        'The client, by signature of this agreement, indemnifies ' + companyName + ' its owners, successors or assignees from all and any claims arising out of loss, injury, damage or any claim by use of this equipment.',
      ];
      return terms.map(t => '<li>' + t + '</li>').join('');
    })()}
  </ul>

  <!-- ── SIGNATURE -->
  <div class="qp-signature">
    <p style="margin-bottom:1px;">Regards,</p>
    <p style="margin-bottom:14px;">${quote.contact_person || quote.client_name || ''}</p>
    <div class="qp-sig-row">
      <div style="min-width:200px;">
        <p style="margin-bottom:4px;font-size:8pt;">Signature:</p>
        ${c.signature
          ? '<img src="' + c.signature + '" style="max-height:50px;max-width:180px;object-fit:contain;display:block;border-bottom:1px solid #999;">'
          : '<div style="width:200px;border-bottom:1px solid #999;height:50px;"></div>'
        }
      </div>
      <div style="min-width:160px;">
        <p style="margin-bottom:4px;font-size:8pt;">Date:</p>
        <p style="border-bottom:1px solid #999;min-width:140px;padding-bottom:2px;">${quote.quote_date ? helpers.formatDate(quote.quote_date) : ''}</p>
      </div>
    </div>
  </div>

  <div style="text-align:center;font-size:7pt;color:#aaa;margin-top:24px;">Page 1</div>
  `;
}

function printQuote(quote, company) {
  const html = renderQuotePreviewHTML(quote, company);
  // Strip the control bar from the print HTML
  const printHtml = html.replace(/<div class="qp-controls">[\s\S]*?<\/div>\s*/, '');

  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(`<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>Quote ${quote.number || ''}</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: Arial, Helvetica, sans-serif; font-size: 9pt; color: #111;
       background: #fff; padding: 28px 32px 40px 32px; }
.qp-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
.qp-logo-area { display:flex; flex-direction:column; gap:0; }
.qp-logo-img { width:220px; height:auto; object-fit:contain; margin-left:-22px; }
.qp-logo-text { font-size:14pt; font-weight:700; color:#c0392b; font-style:italic; margin-top:4px; }
.qp-contact-info { text-align:left; font-size:8pt; align-self:flex-start; padding-top:8px; }
.qp-title-block { margin:10px 0 8px; }
.qp-title-block h1 { font-size:20pt; font-weight:900; letter-spacing:0.06em; text-align:center; margin-bottom:8px; }
.qp-meta { font-size:8pt; line-height:1.8; }
.qp-meta strong { font-weight:700; }
.qp-table { width:100%; border-collapse:collapse; margin-top:10px; font-size:8pt; }
.qp-table th { background:#760014; color:#D0A95E; padding:5px 7px; text-align:left; font-weight:700; border:1px solid #5a000f; }
.qp-table th:last-child, .qp-table th:nth-last-child(2) { text-align:right; }
.qp-table td { padding:3px 7px; border:1px solid #ccc; vertical-align:top; }
.qp-table td:last-child, .qp-table td:nth-last-child(2) { text-align:right; white-space:nowrap; }
.qp-section-row td { background:#D0A95E; color:#000; font-weight:700; padding:4px 7px; border:1px solid #b8923f; }
.qp-subsection-row td { background:#D0A95E; color:#000; font-weight:700; padding:4px 7px; border:1px solid #b8923f; }
.qp-subtotal-row td { font-weight:700; background:#fff; color:#111; border:1px solid #ccc; padding:4px 7px; }
.qp-table tbody tr.even td { background:#fafafa; }
.qp-totals-table { width:300px; margin-left:auto; margin-top:8px; border-collapse:collapse; font-size:9pt; }
.qp-totals-table td { padding:4px 8px; border:1px solid #ccc; }
.qp-totals-table .total-label { font-weight:700; }
.qp-totals-table .total-grand { font-weight:900; font-size:10pt; background:#D0A95E; color:#000; }
.qp-terms-header { display:inline-block; background:#760014; color:#D0A95E; font-style:normal;
  font-weight:700; padding:4px 14px; font-size:8.5pt; margin-top:8px; border-radius:2px; letter-spacing:0.02em; }
.qp-terms-list { margin-top:6px; padding-left:0; list-style:none; }
.qp-terms-list li { display:flex; gap:8px; margin-bottom:3px; font-size:7.5pt; line-height:1.5; color:#111; align-items:flex-start; }
.qp-terms-list li::before { content:"□"; font-size:9pt; flex-shrink:0; line-height:1.4; color:#111; }
.qp-signature { margin-top:32px; font-size:9pt; }
.qp-signature p { margin-bottom:4px; }
.qp-sig-row { display:flex; gap:80px; margin-top:6px; align-items:flex-start; }
.cayan-logo-svg { width:220px; height:auto; }
@page { margin: 10mm; size: A4; }
@media print { html,body { height:auto; } }
</style>
</head><body>${printHtml}</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); win.close(); }, 600);
}

function showQuotePreview(quote, company) {
  // Remove any existing overlay
  const existing = document.querySelector('.quote-preview-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'quote-preview-overlay';

  const wrapper = document.createElement('div');
  wrapper.className = 'quote-preview-wrapper';
  wrapper.innerHTML = renderQuotePreviewHTML(quote, company);

  window.__currentQuote = quote;
  window.__currentCompany = company;
  overlay.appendChild(wrapper);
  document.body.appendChild(overlay);

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}