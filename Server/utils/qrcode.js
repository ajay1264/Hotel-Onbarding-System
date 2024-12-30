import QRCode from 'qrcode';

export const createQRCode = async (data) => {
  try {
    const url = await QRCode.toDataURL(`https://example.com/hotel/${data}`);
    return url;
  } catch (err) {
    console.error('Error generating QR code', err);
  }
};
