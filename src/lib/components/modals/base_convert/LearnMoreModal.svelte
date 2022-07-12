<script>
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="base-convert-learn-modal" showCloseBtn>
	<div slot="title">Learn</div>
	<p>
		<b>What are number bases?</b><br />
		A base is a counting system. Base 10, or "decimal" uses the digits 0,1,2,3,4,5,6,7,8, and 9.<br
		/>
		Each number further left represents a power of 10.<br />
		For example, 987 is 9 100s, 8 10s, and 7 1s<br />
		or 9*10^2 + 8*10^1 + 7*10^0<br />
		<br />
		If we count in hexadecimal, which is base 16<br />
		("hex" meaning 6 and "decimal" meaning 10),<br />
		we have digits 0,1,2,3,4,5,6,7,8,9,a,b,c,d,e, and f.<br />
		Notice that 10 is a, 11 is b... and we go up to 15 (f), which is 16-1,<br />
		just like in base 10 we go up to 9, which is 10-1.<br />
		<br />
		<b>Examples</b><br />
		For example, for the number 3db in hex,<br />
		instead of the 1s, 10s, and 100s places like decimal,<br />
		we have the 1s, 16s, and 256s places, for powers of 16 instead of powers of 10.<br />
		So 3db is 3*16^2 + d*16^1 + b*16^0 where d is 13 and b is 11.<br />
		So we have 3*256 + 13*16 + 11*1 = 768 + 208 + 11 = 987.<br />
		So 3db in hex is 987 in decimal.<br />
		<br />
		Similarly, we can convert decimal back to base 16:<br />
		987/16 is 61 remainder 11.<br />
		61/16 is 3 remainder 13.<br />
		and 3 doesn't go into 16, so we finish with remainder 3.<br />
		We take the remainders and go back upwards: so we have 3, then 13, then 11, which is 3db<br />
		<br />
		<b>About Bases</b><br />
		If we count in binary, which is base 2 ("bi" meaning 2) we have digits 0 and 1.<br />
		The prefix "bi" is used in "bicycle", "bipetal", and "bilingual".<br />
		In octal (base 8, "oct" meaning 8) we have digits 0,1,2,3,4,5,6, and 7.<br />
		The prefix "oct" is used in "octopus" and "octagon".<br />
		Base 2,8, and 16 are often used in programming because they're all powers of 2,<br />
		data is stored in binary, and conversion between them is easy.<br />
		We probably count in decimal because we have ten fingers.<br />
	</p>

	<hr class="my-4" />

	<p>
		<b>Using the Table as a Shortcut</b><br />
		Converting between base 2, 8, and 16 is easy.<br />
		You can just look at the quick reference table<br />
		and substitute every 4 binary digits for a hex digit, or 3 for an oct digit.<br />
		If the amount isn't divisable by 3 or 4 (whichever you need), pad the beginning with 0s.<br />
		To convert from hex or oct, do the opposite.<br />
		<br />
		<b>For example:</b><br />
		3db in hex: 3 is 0011, d is 1101 and b is 1011, so 3db is 001111011011<br />
		getting rid of the leading 0s we have 1111011011<br />
		converting 1111011011 back, we add 0s to make the number of digits divisable by 4<br />
		this is because 2^4 is 16.<br />
		001111011011 split into groups of 4 is 0011 1101 1011 which in the table is 3, d, and b<br />
		<br />
		<b>Misc. Facts:</b><br />
		Sexigesimal (base 60) was used by ancient sumerians.<br />
		That is why there are 60 seconds in a minute and 360 degrees in a circle.<br />
		Sometimes bases above 10 use lowercase letters, but most of the time it's capital.<br />
		Bases above 36 often use both capital and lowercase.<br />
		Sometimes base 26 starts at A (where Z is 0).<br />
		We often use hexadecimal to abbreviate RGB colors because each color is between 0-255,
		<br />
		so each color is 2 hexadecimal digits.<br />
		Sometimes people call hexadecimal "hex".<br />
		Most of the time you can assume "hex" refers to base 16 not base 6.<br />
		Binary is sometimes called "bin".<br />
		RGB hexadecimal codes often start with a "#",<br />
		and sometimes are only 3 digits meaing they store only the most significant digit of each color.<br
		/>
	</p>
</Modal>
