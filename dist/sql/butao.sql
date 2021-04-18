-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-04-18 11:12:45
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `butao`
--

-- --------------------------------------------------------

--
-- 表的结构 `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `goods_num` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `car`
--

INSERT INTO `car` (`id`, `goods_id`, `username`, `goods_num`) VALUES
(49, 5, '123456', '3'),
(56, 11, '123456', '2'),
(57, 10, '123456', '1'),
(54, 2, '123456', '4'),
(53, 2, '哈哈哈', '2');

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `goods_id` int(100) NOT NULL,
  `goods_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_price` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_yuanjia` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `car_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_logo` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_imgmin` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_imgmin2` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_imgmin3` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_imgmin4` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_imgmin5` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `goods_zhekou` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`goods_id`, `goods_name`, `goods_price`, `goods_yuanjia`, `car_id`, `goods_logo`, `goods_imgmin`, `goods_imgmin2`, `goods_imgmin3`, `goods_imgmin4`, `goods_imgmin5`, `goods_zhekou`) VALUES
(1, '森马休闲裤男春秋 2015新款男装韩版学生修脚裤', '118.00', '128.99', '男裤', 'nanzhuang (1).jpg', 'nanzhuang (1).jpg', 'nanzhuang (3).jpg', 'nanzhuang (4).jpg', 'nanzhuang (5).jpg', 'nanzhuang (6).jpg', '9折'),
(2, '森马短袖衬衫男2020新款夏季韩版宽松寸衫青少年简约翻领男士衬衣', '230.00', '250.88', '男衣', 'nanzhuang (4).jpg', 'nanzhuang (4).jpg', 'nanzhuang (8).jpg', 'nanzhuang (2).jpg', 'nanzhuang (7).jpg', 'nanzhuang (5).jpg', '8折'),
(3, '森马长款风衣 2016秋装新款 女士休闲简约纯色百搭翻领收腰外套潮', '128.00', '118.88', '女衣', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (10).jpg', 'nvzhuang (11).jpg', 'nvzhuang (12).jpg', '8折'),
(4, '森马卫衣女2017冬季新款圆领宽松长袖T恤前短后长女装学生中长款', '135.00', '125.00', '女衣', 'nvzhuang (6).jpg', 'nvzhuang (5).jpg', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (4).jpg', '8折'),
(5, '森马毛衣 2016冬装新款 女士圆领套头字母提花宽松毛衫针织衫韩版', '135.00', '125.00', '女衣', 'nvzhuang (9).jpg', 'nvzhuang (5).jpg', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (4).jpg', '8折'),
(6, '森马青少年短袖T恤 2016夏装新款 男士V领纯色短T男装上衣韩版潮', '138.00', '125.00', '男衣', 'nanzhuang (9).jpg', 'nanzhuang (5).jpg', 'nanzhuang (7).jpg', 'nanzhuang (8).jpg', 'nanzhuang (9).jpg', 'nanzhuang (4).jpg', '8折'),
(7, '森马休闲裤女2017冬季新款黑色条纹运动裤小脚裤抽绳长裤学生裤子', '135.00', '125.00', '女裤', 'nvzhuang (6).jpg', 'nvzhuang (5).jpg', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (4).jpg', '8折'),
(8, '森马短袖T恤2016年夏装新款女士条纹宽松字母圆领上衣网纱休闲潮', '135.00', '125.00', '女衣', 'nvzhuang (5).jpg', 'nvzhuang (5).jpg', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (4).jpg', '8折'),
(9, '森马长款风衣 2016秋装新款 女士休闲简约纯色百搭翻领收腰外套潮', '135.00', '125.00', '女衣', 'nvzhuang (7).jpg', 'nvzhuang (5).jpg', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (4).jpg', '8折'),
(10, '森马牛仔短裤女夏季2020新款复古黑色牛仔裤高腰显瘦宽松阔腿短裤', '168.00', '128.00', '女裤', 'nvzhuang (8).jpg', 'nvzhuang (5).jpg', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (4).jpg', '8折'),
(11, '森马短袖衬衫 夏季新款女装 女士百搭翻领格子衫短袖衬衫韩版', '168.00', '128.00', '女衣', 'nvzhuang (4).jpg', 'nvzhuang (5).jpg', 'nvzhuang (7).jpg', 'nvzhuang (8).jpg', 'nvzhuang (9).jpg', 'nvzhuang (4).jpg', '8折'),
(12, '森马短袖衬衫男2020新款夏季韩版宽松寸衫青少年简约翻领男士衬衣', '108.00', '128.99', '男衣', 'nanzhuang (16).jpg', 'nanzhuang (2).jpg', 'nanzhuang (3).jpg', 'nanzhuang (4).jpg', 'nanzhuang (5).jpg', 'nanzhuang (6).jpg', '9折');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `username` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `phonenum` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `phonenum`) VALUES
(1, '123456', '123456', '62641541'),
(16, '18316140990', '18316140990', '18316140990');

--
-- 转储表的索引
--

--
-- 表的索引 `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`goods_id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `goods_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
