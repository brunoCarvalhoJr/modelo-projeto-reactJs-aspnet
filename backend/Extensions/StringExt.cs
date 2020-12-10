using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace backend.Extensions
{
    public static class StringExt
    {
        public static string ToSnakeCase(this string input)
        {
            if (string.IsNullOrEmpty(input)) { return input; }

            var startUnderscores = Regex.Match(input, @"^_+");
            return startUnderscores + Regex.Replace(input, @"([a-z0-9])([A-Z])", "$1_$2").ToLower();
        }

        public static string RemoveHtmlTags(this string @this)
        {
            var result = @this;
            if (string.IsNullOrEmpty(result)) return result;

            result = result.Replace("<p>", "");
            result = result.Replace("</p>", "");
            result = result.Replace("<strong>", "");
            result = result.Replace("</strong>", "");
            result = result.Replace("<span>", "");
            result = result.Replace("</span>", "");
            result = result.Replace("<h1>", "");
            result = result.Replace("</h1>", "");
            result = result.Replace("<h2>", "");
            result = result.Replace("</h2>", "");
            result = result.Replace("<h3>", "");
            result = result.Replace("</h3>", "");
            result = result.Replace("<h4>", "");
            result = result.Replace("</h4>", "");
            result = result.Replace("<ol>", " ");
            result = result.Replace("</ol>", " ");
            result = result.Replace("<li>", " ");
            result = result.Replace("</li>", " ");
            result = result.Replace("<i>", "");
            result = result.Replace("</i>", "");
            result = result.Replace("<blockquote>", "");
            result = result.Replace("</blockquote>", "");
            result = result.Replace("<&nbsp;>", "");
            result = result.Replace("&nbsp;", "");




            return result;

        }

        public static string ComputeBase64Hash(this string data, bool useSHA1 = false)
        {
            using (HashAlgorithm hashProvider = useSHA1 ? new SHA1Managed() : (HashAlgorithm)new SHA256Managed())
            {
                return Convert.ToBase64String(hashProvider.ComputeHash(Encoding.Unicode.GetBytes(data)));
            }
        }


        public static string ComputeBase64MD5(this string data)
        {
            HashAlgorithm hashProvider = MD5.Create();
            return Convert.ToBase64String(hashProvider.ComputeHash(Encoding.Unicode.GetBytes(data)));
        }

        public static string OnlyDigits(this string s)
        {
            return Regex.Replace(s, @"[\D]", string.Empty);
        }


        public static string OnlyLetters(this string s)
        {
            if (string.IsNullOrEmpty(s))
                return s;
            return new string(s.Where(c => char.IsLetter(c)).ToArray());
        }


        public static string OnlyAlphanumeric(this string s)
        {
            if (string.IsNullOrEmpty(s))
                return s;
            return new string(s.Where(c => char.IsLetterOrDigit(c)).ToArray());
        }


        public static bool AllDigits(this string @this)
        {
            return Regex.IsMatch(@this, @"^[0-9]+$");
        }


        public static bool IsDate(this string @this)
        {
            try
            {
                DateTime.Parse(@this);
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }

        public static bool IsDecimal(this string @this)
        {
            if (string.IsNullOrWhiteSpace(@this))
                return false;

            @this = @this.Replace('.', ',');
            if (@this.IndexOf(',') < 0 || (@this.OnlyDigits().Length < @this.Length - 1 && (@this[0] != '-' || @this[0] != '+')))
                return false;
            try
            {
                decimal.Parse(@this);
                return true;
            }
            catch(Exception)
            {
                return false;
            }
        }

        public static bool EqualCaseAndAccentInsensitive(this string @this, string other)
        {
            var ci = new CultureInfo("en-US").CompareInfo;
            var co = CompareOptions.IgnoreCase | CompareOptions.IgnoreNonSpace;
            return ci.Compare(@this, other, co) == 0;
        }

        public static string RemoveAccent(this string @this)
        {
            var result = @this;
            if (!String.IsNullOrEmpty(result))
            {

                result = Regex.Replace(result, "[áàâãª]", "a");
                result = Regex.Replace(result, "[ÁÀÂÃ]", "A");
                result = Regex.Replace(result, "[éèêë]", "e");
                result = Regex.Replace(result, "[ÉÈÊË]", "E");
                result = Regex.Replace(result, "[íìî]", "i");
                result = Regex.Replace(result, "[ÍÌÎ]", "I");
                result = Regex.Replace(result, "[óòôõº]", "o");
                result = Regex.Replace(result, "[ÓÒÔÕ]", "O");
                result = Regex.Replace(result, "[úùû]", "u");
                result = Regex.Replace(result, "[ÚÙÛÜ]", "U");
                result = Regex.Replace(result, "[ç]", "c");
                result = Regex.Replace(result, "[Ç]", "C");

                return result;
            }
            else
            {
                return "";
            }
        }

        public static string CorrectName(this string str)
        {
            return MakeVariableName(str.RemoveAccent());
        }

        public static string MakeVariableName(this string str)
        {
            var sb = new StringBuilder(str);
            for (int pos = 0; pos < sb.Length; pos++)
                if (!(char.IsLetterOrDigit(sb[pos]) || sb[pos] == '_'))
                    sb[pos] = '_';

            str = sb.ToString();
            if (str.Length > 0 && char.IsDigit(str[0]))
                str = "n" + str;

            return str;
        }

        public static string MaxTrim(this string _this, string oldValue = " ", string newValue = "", bool keepAccent = false)
        {
            var result = _this.Replace(oldValue, newValue);
            if (!keepAccent)
                result = result.RemoveAccent();

            return result;
        }


        public static bool ToBool(this string @this)
        {
            if (string.IsNullOrEmpty(@this))
                return false;
            if (@this.EqualCaseAndAccentInsensitive("true") || @this.EqualCaseAndAccentInsensitive("sim"))
                return true;
            else if (@this.EqualCaseAndAccentInsensitive("false") || @this.EqualCaseAndAccentInsensitive("não"))
                return false;

            return Regex.IsMatch(@this, "T|S|V|Y|1|", RegexOptions.CultureInvariant | RegexOptions.IgnoreCase);
        }

        public static dynamic ToType(this string @this, Type type)
        {
            if (string.IsNullOrWhiteSpace(@this))
                return null;

            var culture = CultureInfo.CurrentCulture;
            if (type == typeof(short) || type == typeof(short?))
                return string.IsNullOrWhiteSpace(@this) ? 0 : short.Parse(@this);
            if (type == typeof(int) || type == typeof(int?))
                return string.IsNullOrWhiteSpace(@this) ? 0 : int.Parse(@this);
            if (type == typeof(long) || type == typeof(long?))
                return string.IsNullOrWhiteSpace(@this) ? 0 : long.Parse(@this);
            if (type == typeof(decimal) || type == typeof(decimal?))
                return string.IsNullOrWhiteSpace(@this) ? 0M : decimal.Parse(@this, culture.NumberFormat);
            if (type == typeof(DateTime) || type == typeof(DateTime?))
                return string.IsNullOrWhiteSpace(@this) ? DateTime.MinValue : DateTime.Parse(@this);
            if (type == typeof(bool) || type == typeof(bool?))
                return ToBool(@this);
            if (type == typeof(Guid) || type == typeof(Guid?))
                return string.IsNullOrWhiteSpace(@this) ? Guid.Empty : new Guid(@this);


                return Convert.ChangeType(@this, type);
        }

        public static T ToType<T>(this string @this)
        {
            return @this.ToType(typeof(T));
        }

        /// <summary>
        /// Converte string em decimal com a quantidade de casas decimais inidicada
        /// </summary>
        /// <param name="s">string a ser convertida</param>
        /// <param name="decimalPlaces">Quantida de casas decimais</param>
        /// <returns>0 se s for nulo ou vazio, caso contrario o valor decimal correspondente</returns>
        public static decimal ToDecimal(this string s, int decimalPlaces)
        {
            if (string.IsNullOrWhiteSpace(s))
                return decimal.Zero;

            s = s.Insert(s.Length - decimalPlaces, NumberFormatInfo.CurrentInfo.CurrencyDecimalSeparator);

            return decimal.Parse(s);
        }


        public static DateTime ToDate(this string @this)
        {
            if (string.IsNullOrWhiteSpace(@this))
                throw new ArgumentNullException("date");

            @this = @this.OnlyDigits();
            var comprimentoDaStringDe6Digitos = 6;
            var comprimentoDaStringDe8Digitos = 8;
            if (@this.Length != comprimentoDaStringDe6Digitos && @this.Length != comprimentoDaStringDe8Digitos)
                throw new ArgumentException("date");

            if (@this.Length == comprimentoDaStringDe6Digitos)
            {
                var seculo = DateTime.Today.Year / 100;
                @this = @this.Insert(4, seculo.ToString("D2"));
            }

            @this = @this.Insert(2, "/").Insert(5, "/");

            return DateTime.Parse(@this);
        }



        #region ByteArraysStrings


        public static byte[] HexadecimalToByteArray(this string @this)
        {
            if (string.IsNullOrWhiteSpace(@this))
                return null;

            var size = @this.Length / 2;
            var result = new byte[size];
            @this = @this.ToLower();

            int index;
            for (int i = 0; i < size; i++)
            {
                index = i * 2;
                result[i] = Convert.ToByte(@this.Substring(index, (index + 2) - (index)), 16);
            }

            return result;
        }


        public static string HexadecimalToString(string hexString)
        {
            if (string.IsNullOrWhiteSpace(hexString))
                return hexString;

            var size = hexString.Length / 2;
            var sb = new StringBuilder();
            var inString = hexString.ToLower();

            for (int i = 0; i < size; i++)
            {
                var index = i * 2;
                var ii = Convert.ToInt32(inString.Substring(index, (index + 2) - (index)), 16);
                sb.Append((char)ii);
            }
            return sb.ToString(); ;
        }


        public static string ByteArrayToString(byte[] array)
        {
            if (array == null)
                return null;

            if (array.Length == 0)
                return string.Empty;

            var encode = new UnicodeEncoding();
            return encode.GetString(array, 0, array.Length);
        }


        public static string ByteArrayToASCIIString(byte[] array)
        {
            if (array == null)
                return null;

            if (array.Length == 0)
                return string.Empty;

            var encode = new ASCIIEncoding();
            return encode.GetString(array, 0, array.Length);
        }


        public static byte[] ToASCIIByteArray(this string @this)
        {
            var encode = new ASCIIEncoding();
            return encode.GetBytes(@this);
        }


        public static byte[] ToByteArray(this string @this)
        {
            if (@this == null)
                return null;
            if (@this.Length == 0)
                return new byte[0];

            var ue = new UnicodeEncoding();
            return ue.GetBytes(@this);
        }

        #endregion ByteArraysStrings


        public static string Trunc(this string value, int maxLength)
        {
            if (string.IsNullOrWhiteSpace(value) || value.Length <= maxLength)
                return value;

            return value.Substring(0, maxLength);
        }

        public static string ToString(this bool _this, bool isLiteral, string culture = "en-US")
        {
            if (isLiteral)
            {
                if (culture == "en-US")
                    return _this.ToString();
                return _this ? "Verdadeiro" : "Falso";
            }
            else
            {
                if (culture == "en-US")
                    return _this ? "Yes" : "No";
                return _this ? "Sim" : "Não";
            }
        }

        public static List<string> PhraseToListOfWords(string input)
        {
            var fixedInput = Regex.Replace(input, "[^a-zA-Z0-9% ._]", string.Empty);
            var split = fixedInput.Split(' ');
            var words = input.RemoveSpecialCharacters().Split(' ');

            return words.ToList();

        }

        public static string RemoveSpecialCharacters(this string str)
        {
            var sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '\'' || c == ' ')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public static string FirstCharToUpper(this string input)
        {
            if (String.IsNullOrEmpty(input))
                throw new ArgumentException("ARGH!");
            return input.First().ToString().ToUpper() + input.Substring(1);
        }
    }
}
